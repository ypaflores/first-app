import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormsModule, FormGroup, FormBuilder, Validators, NgControlStatus } from '@angular/forms';
import { Notizia } from './classe';
import { Card } from '../../model/card.model';
import { NotesProvider } from '../../providers/notes/notes';
import { OperationsProvider } from '../../providers/operations/operations';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
/**
 * Generated class for the InsertNoticiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-insert-noticia',
  templateUrl: 'insert-noticia.html',
})
export class InsertNoticiaPage {
  base64Image: string="";
  image: string = null; 
  modeKeys:any;
  status:boolean =false;
  Titulo="Nueva noticia";
  lang: string;
  translation: any;

  card:Card={
    title:"",
    comm:"",
    ctg:"",
    state:"happy",
    img:"",
    date:this.op.getDateFormat()
  };
  
  constructor(private camera: Camera,private formBuilder:FormBuilder,  public navCtrl: NavController,
    private noteListService: NotesProvider,public navParams:NavParams,private op:OperationsProvider,
    public loadingCtrl: LoadingController,
    private translateService: TranslateService,
    private utilities: UtilitiesProvider,private alertCtrl: AlertController) {
    
    this.modeKeys = this.noteListService.getCategorie();
      
    let tmp =  navParams.get("element");
    if(tmp!= null){
     this.card=tmp;
      this.status = true;
      this.Titulo="Cambia noticia";
    }
    
  }

  accessGallery(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 1920,
        targetHeight: 540,
        allowEdit: false
      }
      this.camera.getPicture(options).then((imageData) => {
        if (this.utilities.getPlatform() == 'ios') {
            this.base64Image = normalizeURL(imageData);  
        }
        else {
          this.base64Image= imageData.substring(0,imageData.indexOf('?'))
        }
        this.card.img=this.base64Image;
        this.utilities.showToast("Imagen seleccionada "+ this.base64Image);
       }
      ).catch((reject) => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Error al obtener la imagen: ' + reject,
          buttons: ['OK']
        });
  
        alert.present();
      });
    }
    

    newNews()
    {
      let app = this.NgControlStatus();
        if(!app)return;
        else{
          (this.status)?this.updateCard(this.card):this.insertCard(this.card)
        }    
    }

    public insertCard(card: Card) {
      let loader = this.loadingCtrl.create({
        content: "Agregando Objeto nuevo"
      });
      loader.present().then((res)=> {
        this.noteListService.addNote(card).then(ref => {
        })
        if(res)loader.dismiss();
        this.utilities.showToast(this.translation.BIEN_HECHO.CREADO);
        this.deleteAll();
      })
    }

    updateCard(card: Card) {
      let loader = this.loadingCtrl.create({
        content: "Modificando Objeto seleccionado"
      });
        loader.present().then((res)=> {
          this.noteListService.updateNote(card).then(()=>{
        });
        if(res)loader.dismiss();
            this.navCtrl.pop();
      })
    }

    private NgControlStatus(){
      
        if(this.card.title==""||this.card.ctg==""||this.card.comm==""){
            this.utilities.showAlert(this.translation.DESCONOCIDO.TITULO, this.translation.DESCONOCIDO.DESC);
            return false;
        }
        if(this.card.title.length>16){
          this.utilities.showAlert(this.translation.TITULO_MUCHO.TITULO, this.translation.TITULO_MUCHO.DESC);
          return false;
        }
        if(this.card.comm.length<7){
          this.utilities.showAlert(this.translation.DESC_CORTA.TITULO, this.translation.DESC_CORTA.DESC);
          return false;
        }
        if(this.card.img.length==0||this.card.img==""){
          this.utilities.showAlert(this.translation.SIN_FOTO.TITULO, this.translation.SIN_FOTO.DESC);
          return false;
        }
        return true;
    }

    deleteAll(){
      this.card.comm="";
      this.card.img="";
      this.card.title="";
      this.card.ctg="";
      this.card.state="happy";
    }

    obtenerTraduccion() {
      setTimeout(() => {
        this.translateService.get('CREAR_NOTICIA.ERRORES/SUCESOS').subscribe(result => {
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
    //modificar el card.img porque salvarlo como objeto en storage de firebase o si no  en  un db local 
    takePicture(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        targetWidth: 1920,
        targetHeight: 540,
        allowEdit: false
      }
      this.camera.getPicture(options).then((imageData) => {

      this.base64Image =  imageData;
      this.card.img = this.base64Image;
      this.utilities.showToast("Imagen seleccionada "+ this.base64Image);
     }
    ).catch((reject) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Error al obtener la imagen: ' + reject,
        buttons: ['OK']
      });

      alert.present();
    });
    }
  
}
