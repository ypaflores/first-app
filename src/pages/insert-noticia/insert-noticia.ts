import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notizia } from './classe';
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
  myForm: FormGroup;
  base64Image: string;
  image: string = null; 
  modeKeys:any;
  dati:Notizia;
  emozione:string="happy";
  
  constructor(private camera: Camera,private formBuilder:FormBuilder,) {
    
    this.modeKeys = [
      'Comida',
      'Deporte',
      'Escuela',
      'Trabajo',
    ]
    this.myForm = formBuilder.group({
      'title': ['', Validators.compose([Validators.required,Validators.minLength(3)])],
        'description': ['', Validators.compose([Validators.required,Validators.minLength(7)])],
        'category': ['', Validators.compose([Validators.required])]
  });

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
    }
    

    newNews()
    {
      this.dati= new Notizia(this.myForm.value['title'],this.myForm.value['description'],this.myForm.value['category'],this.emozione);
     
      alert( this.dati.title+" "+this.dati.description+" "+this.dati.category+" " + this.dati.state );
      
    }
}
