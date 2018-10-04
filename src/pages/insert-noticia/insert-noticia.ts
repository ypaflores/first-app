import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, } from '@angular/forms';
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
    date:this.op.getDateFormat(),
    idUser:""
  };
  
  constructor(private camera: Camera,private formBuilder:FormBuilder,  public navCtrl: NavController,
    private noteListService: NotesProvider,public navParams:NavParams,private op:OperationsProvider,
    public loadingCtrl: LoadingController,
    private translateService: TranslateService,
    private utilities: UtilitiesProvider,private alertCtrl: AlertController) {
    
    this.modeKeys = this.noteListService.getCategorie();
    
    //Controla si hay que ingresar un nueva noticia o si hay que modificarla .. controlando un parametro pasado a ala pagin
    //si hay entonces a modificar si no a crear
    let tmp =  navParams.get("element");
    if(tmp!= null){
     this.card=tmp;
      this.status = true;
      this.Titulo="Cambia noticia";
    }
    this.utilities.getUserData().then(user=>{
      this.card.idUser=user.id;
    })
  }

  //Hace el acceso a la galeria para seleccionar un media (foto)
  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.base64Image = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
    }
    
    //Hace un update o add segun su controles de campos completados
    newNews()
    {
      let app = this.NgControlStatus();
        if(!app)return;
        else{
          (this.status)?this.updateCard(this.card):this.insertCard(this.card)
        }    
    }

    //Registra una nueva noticia
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
    //Modifica una noticia dada
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

    //Controla los campos , y manda un alert del dispositivo segun su fallo
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

    //Borra los campos una vez rellenados y hecho update o add
    deleteAll(){
      this.card.comm="";
      this.card.img="";
      this.card.title="";
      this.card.ctg="";
      this.card.state="happy";
    }

    //Obtiene las traducciones adecuadas a para los menasajes bien o mal de exitos
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
    //Coje la camara y te consiente de hacer la foto y obtener la imagen
    takePicture(){
      this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true
      }).then(imageData => {
        this.base64Image = imageData;
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }
}
