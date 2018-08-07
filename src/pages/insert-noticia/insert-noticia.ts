import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormsModule, FormGroup, FormBuilder, Validators, NgControlStatus } from '@angular/forms';
import { Notizia } from './classe';
import { Card } from '../../model/card.model';
import { NotesProvider } from '../../providers/notes/notes';
import { OperationsProvider } from '../../providers/operations/operations';
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
  base64Image: string;
  image: string = null; 
  modeKeys:any;
  status:boolean =false;
  Titulo="Nueva noticia";
  
  card:Card={
    title:"",
    comm:"",
    ctg:"",
    state:"happy",
    img:"",
    date:this.op.getDateFormat()
  };
  
  constructor(private camera: Camera,private formBuilder:FormBuilder,  public navCtrl: NavController,
    private noteListService: NotesProvider,public navParams:NavParams,private op:OperationsProvider) {
    
    this.modeKeys = this.noteListService.getCategorie();
      
    let tmp =  navParams.get("element");
    if(tmp!= null){
     this.card=tmp;
      this.status = true;
      this.Titulo="Cambia noticia";
    }
    
  }

  accessGallery(){

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       console.log(err);
     });
     this.card.img="http://www.lacocinademona.com/wp-content/uploads/2015/09/aeropuerto-chifa-721x541.jpg";
    }

    takePhoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
       }, (err) => {
        
       });
       this.card.img="https://i3.wp.com/tiempodenegocios.com/wp-content/uploads/2017/10/lista-de-tareas-700x406.jpg";
    }
    

    newNews()
    {
      let app = this.NgControlStatus();
        if(!app)return;
        else{
          alert("todo correcto!");
          (this.status)?this.updateCard(this.card):this.insertCard(this.card)
        }    
    }

    public insertCard(card: Card) {
      alert("Estoy introduciendo nuevos Datos");
        this.noteListService.addNote(card).then(ref => {
          this.navCtrl.setRoot('TabNewPage');
        })
    }
    updateCard(card: Card) {
      alert("Estoy modificando viejos Datos");
     this.noteListService.updateNote(card);
      
    }

    private NgControlStatus(){
      
        if(this.card.title==""||this.card.ctg==""||this.card.comm==""){
            alert("Controla los campos vacios");
            return false;
        }
        if(this.card.title.length>16){
          alert("titulo maximo 10 carcteres");
          return false;
        }
        if(this.card.comm.length<7){
          alert("escriba una descripcion mas larga");
          return false;
        }
        if(this.card.img.length==0||this.card.img==""){
          alert("seleccione foto");
          return false;
        }
        return true;
    }

    
}
