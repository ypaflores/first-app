import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { NotesProvider } from '../../providers/notes/notes';
import { Md5 } from 'ts-md5';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { OperationsProvider } from '../../providers/operations/operations';
import { TranslateService } from '@ngx-translate/core';
import {SignaturePage} from '../signature/signature'
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  currentEvents :any[]=[]; 
  myForm: FormGroup;
  tipo:string;
  md5HashMes:string;
  diaCorrente:any;
  objectCor:any;
  objetoModificar:any;
  pdfObj = null; 
  user:any;
  arregloGiorniMesi = this.operationsC.getArregloGiorniMesi();
  arregloDiasOrasTotales:any=[0,0];
  lang: string;
  translation: any;
  public signatureImage : any;

  constructor(private plt: Platform,private translateService: TranslateService,public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private utilities:UtilitiesProvider,private data:NotesProvider,private operationsC : OperationsProvider,private file: File, private fileOpener: FileOpener,public modalController:ModalController) {
    var dateObj = new Date();
    this.md5HashMes = Md5.hashStr(dateObj.getUTCFullYear()+""+dateObj.getUTCMonth()).toString();
    this.getCalendario(this.md5HashMes);
    this.utilities.getUserData().then((us)=>{
        this.user = us;
    });
    this.tipo="";
    this.signatureImage = navParams.get('signatureImage');
    console.log(this.signatureImage);
    
  }

  //Quando selecciono un dia del calendario , cambio el objeto diacorriente y encuentro el objeto que le corresponde
  onDaySelect(event){
    if(this.diaCorrente!=event){
      this.instauraForm();
      this.tipo='nuevoEvento'; 
      this.diaCorrente=event;
      this.objectCor=this.findObjectDay();
    } 
    console.log(event);
       
  }
  openSignatureModel(){
    let modal = this.modalController.create(SignaturePage);
    modal.onDidDismiss(data => {
      console.log({dataOnDidDismiss:data});
      if(data.estado){
        console.log(data);
        this.signatureImage = data.image;
      }
    });
    modal.present();
  }
  //Quando cambio de mes recargo los datos del calendario de firebase 
  onMonthChange(event){
      this.md5HashMes = Md5.hashStr(event.year+""+event.month).toString();
      this.getCalendario(this.md5HashMes);
      this.tipo="";
      
  }
  //Form nueva para ingresar un evento , con llugar y tiempo
  instauraForm(){
    this.myForm = this.formBuilder.group({
      'lugar': ['', Validators.compose([Validators.required])],
        'tiempo': ['01:00', Validators.compose([Validators.required])]
    });
  }
  //Agregar o cambiar en base al tipo.
  agregar(){
    if(this.tipo=='nuevoEvento'){
      this.addDayEvent({lugar:this.myForm.value.lugar,tiempo:this.myForm.value.tiempo});
      this.instauraForm();  
    }
    else{
      this.saveModified({lugar:this.myForm.value.lugar,tiempo:this.myForm.value.tiempo});
    }
  }
  //Cancela un evento de la lista del objeto del dia . 
  delete(object:any){
    if(this.objectCor.eventos.length>1){
      this.objectCor.eventos.splice(this.objectCor.eventos.indexOf(object), 1);
      this.data.updateDayCalendario(this.md5HashMes,this.objectCor);
      this.utilities.showToast(this.translation.REMOVIDO);
    }
    else{
      this.data.removeDayCalendario(this.md5HashMes,this.objectCor);
      this.utilities.showToast(this.translation.ELIMINADO);
      this.tipo=""; 
    }
  }
  //Regresa los datos del calendario (Mes) seleccionado
  getCalendario(ev){
    this.data.getCalendario(ev).subscribe((res)=>{
        this.currentEvents=res;
    });
  }
  //Agrega un nuevo evento al dia . si noexiste alguno lo crea si no agrega a una lista 
  addDayEvent(eve:any){
    var tmp="2";
    if(this.objectCor!=null){
      this.objectCor.eventos.push(eve);
      this.data.updateDayCalendario(this.md5HashMes,this.objectCor);
      this.utilities.showToast(this.translation.AGREGADO);
    }
    else{
      let evDay = {year:this.diaCorrente.year,month:this.diaCorrente.month,date:this.diaCorrente.date,eventos:[eve]};
       this.data.saveDayCalendario(this.md5HashMes,evDay);
       this.utilities.showToast(this.translation.CREADO);
      this.tipo='';
    }
    var  app = new Date("January 31 1980 "+ eve.tiempo);
    tmp += app.getHours();
    console.log(tmp);
    
  }
  //Encuentro el objeto del dia , si no lo encuentra regresa null
  findObjectDay(){
    let filtrados = this.currentEvents.filter(day=> {
          return (day.date===this.diaCorrente.date&& day.month ===this.diaCorrente.month && day.year ===this.diaCorrente.year );
    });
    return (filtrados[0])?filtrados[0]:null;
  }
  //modifica el objeto seleccionado 
  modify(object:any){
    this.objetoModificar = object;
    this.tipo = 'modificar';
    this.myForm = this.formBuilder.group({
      'lugar': [object.lugar, Validators.compose([Validators.required])],
        'tiempo': [object.tiempo, Validators.compose([Validators.required])]
    });
  }
  //anula l operacion de cambiar el evento seleccionado
  cancelarUp(){
    this.instauraForm();
    this.tipo='historial';
  }
  //Guarda los cambios en el array y en firebase
  saveModified(object:any){
    this.objectCor.eventos[this.objectCor.eventos.indexOf(this.objetoModificar)] = object;
    this.data.updateDayCalendario(this.md5HashMes,this.objectCor);
    this.cancelarUp();
    this.utilities.showToast(this.translation.MODIFICADO);

  }
  //Obtiene las traducciones adecuadas para los mensajes de exitos/erroneos
  obtenerTraduccion() {
    setTimeout(() => {
      this.translateService.get('CALENDARIO.ERRORES/SUCESOS.EVENTO').subscribe(result => {
        this.utilities.getLang().then(lang => {
          this.lang = lang;
          this.translation = result;
        });
      });
    }, 100);
  }
  ionViewDidLoad() {
    this.obtenerTraduccion();
  } 
  
  
  
  /* PDFF
  */
  //encuentro el dia y recojo los eventos ..
    createPdf2() {
      var ejemplo  = this.currentEvents[0];
      var arrayFinale  = this.operationsC.myFunctionCalendar(ejemplo.year,ejemplo.month,this.currentEvents);
      this.arregloDiasOrasTotales = this.operationsC.getArregloTotali();
      arrayFinale.unshift([{text: 'Data', style: 'tableHeader'}, {text: 'Giorno', style: 'tableHeader'}, {text: 'Posti in cui ho lavorato(Ore)', style: 'tableHeader'},{text: 'Ore Giornata', style: 'tableHeader'}]);
      arrayFinale.push([{},{text: '',style: 'tableHeader', colSpan: 2},{}, {}],[{text: '', style: 'tableHeader'},{text: 'Informazioni Aggiuntive',style: 'tableHeader', colSpan: 2},{}, {text: '',style: 'tableHeader'}]);
      arrayFinale.push([{text: 'Giorni Lavorati', style: 'tableHeader'}, {text: this.arregloDiasOrasTotales[0], style: 'tableHeader'}, {text: 'Ore Totali', style: 'tableHeader'},{text: this.arregloDiasOrasTotales[1], style: 'tableHeader'}]);
      var docDefinition = {
        content: [
          {
            columns: [
              {
                image:'data:image/png;base64,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',
                fit:[80,80]
              },
              [{ text: 'Pulizie Di Scale', style: 'headers' },{ text: 'Lavoratore: '+this.user.username, style: 'sub_header' },
              { text: this.user.email, style: 'data' },{text: "Datore di Lavoro: Masai Franco", style: 'sub_header' },
              {text: "email2@gmail.com", style: 'data' }
            ]
              ]
          },
          { text: 'Calendario Lavorativo Anno  '+ejemplo.year, style: 'header' },
            {
              table: {
              headerRows: 1,
              widths: [ '20%', '18%', '40%', '20%' ],
              body: arrayFinale
            },style:'tableExample'
            ,layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              hLineColor: function (i, node) {
                return (i === 0 ||i === 1|| i === node.table.body.length||i === node.table.body.length-2||i === node.table.body.length-1) ? 'black' : 'gray';
              },
              
            }
          },
          {
            columns: [
              [
                {text: this.operationsC.getDateFormat() + ".  Firma : ", style: 'firma' },
              ],
              [
                {
                  image:this.signatureImage,
                  fit:[100,100]
                }
              ]
            ]
          },
          { text: ' Doveste aver bisogno di ulteriori informazioni, non esitate a contattarmi , Distinti saluti.', style: 'footer' }
        ],
        styles: {
          header: {
            fontSize: 25,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 5]
          },
          tableHeader:{
            bold: true,
            fontSize: 12,
            alignment:'center',
            margin: [0, 3, 0, 5]
          },
          tableExample:{
            fontSize: 11,
            alignment: 'center',
            margin: [0, 5, 0, 5]
          },
          footer:{
            alignment: 'left',
            fontSize: 11,
            margin: [0, 15, 0, 25],
            bold: true
          },
          headers: {
            bold: true,
            fontSize: 20,
            alignment: 'right'
            },
          sub_header: {
            fontSize: 12,
            alignment: 'right'
            },
          data: {
            fontSize: 10,
            alignment: 'right'
            },
            firma:{
              fontSize: 12,
              alignment: 'center',margin: [0, 15, 0, 25]
            },
          pageSize: 'A4',
          pageOrientation: 'landscape'
        }
      }
       this.pdfObj = pdfMake.createPdf(docDefinition);
       this.downloadPdf();
    }
    //descargo el pdf en el movil , o si no desde el browser!
    downloadPdf() {
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
   
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
    }
    /*PDFF*/
}


