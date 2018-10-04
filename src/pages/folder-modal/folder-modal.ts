import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@Ionic-native/file';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the FolderModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-folder-modal',
  templateUrl: 'folder-modal.html',
})
export class FolderModalPage {
  mainSelected: string = 'characters';
   mainCategories = [
       { id: 1, icon: 'user4', page: 'characters', name: 'Characters' },
       { id: 2, icon: 'book', page: 'comics', name: 'Comics' }
    ];
      mainSettings: any = {
        theme: 'material'
    };

selectTopSettings: any = {
  display: 'top'
};
listviewSettings: any = {
  swipe: false,
  enhance: true
}
pageComic = {searchComic: '',searchByYear:0,comics:[],offset:0,countComic:0,masComics:[],hide:true,tipo:'Año'};
pageCharacter = {searchCharacter: '',searchByYear:0,characters:[],offset:0,countCharacters:0,masCharacters:[],hide:true,tipo:'Año'};


  constructor(public viewCtrl: ViewController, 
    public modalCtrl: ModalController, private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,private api:ApiProvider,private alertCtrl: AlertController) {
      this.getCharacters();
      this.getComics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolderModalPage');
  }


  selectMain(page) {
    this.mainSelected = page;
  }

  ngIfCtrl(){
    this.pageComic.hide = !this.pageComic.hide;
    if (this.pageComic.hide == true) {this.pageComic.tipo = 'Año'; this.pageComic.searchComic='' }
    else {this.pageComic.tipo = 'Nombre'; this.pageComic.searchByYear=0; }
    this.pageComic.comics=[];
    this.getComics();
}

//Recojo las informaciones de comics
getComics() {
    console.log("Cargando comics iniciales....")
    this.api.getComics2().then(
        res => {
            this.pageComic.comics = res.data.results;
            this.pageComic.countComic = res.data.count;
            this.pageComic.offset = res.data.offset;
            this.pageComic.searchByYear = 0;
            this.pageComic.searchComic = '';

    });
}
//Recojo mas informaciones de comics y controlo si hay un filtro como nombrer o aNo
//Count va aumentar de default 20/50
doInfinite(infiniteScroll) {

    if (this.pageComic.searchComic.length > 0 && this.pageComic.hide == true)
        {
            console.log("Buscando mas comics por nombre...."+this.pageComic.searchComic);
            this.pageComic.offset += this.pageComic.countComic;
            this.api.searchComicByName(this.pageComic.searchComic,this.pageComic.offset).then(res =>{
              this.pageComic.countComic = res.data.count;
              this.pageComic.masComics = res.data.results;
                console.log(res.data.results);
                this.pageComic.comics = this.pageComic.comics.concat(this.pageComic.masComics);
                infiniteScroll.complete();
            }) 
        }
    if (this.pageComic.searchByYear.toString().length == 4 && this.pageComic.hide == false)
        {
            console.log("Buscando mas comics por año...."+this.pageComic.searchByYear);
            this.pageComic.offset += this.pageComic.countComic
            this.api.searchComicsByYear(this.pageComic.searchByYear,this.pageComic.offset).then(res =>{
              this.pageComic.countComic = res.data.count;
              this.pageComic.masComics = res.data.results;
                console.log(res.data.results);
                this.pageComic.comics = this.pageComic.comics.concat(this.pageComic.masComics);
                infiniteScroll.complete();
            }) 
        }
    if ( this.pageComic.searchByYear < 4 && this.pageComic.searchComic.length == 0 ) {
        console.log("Buscando mas comics....");
        this.pageComic.offset += this.pageComic.countComic;
        this.api.getComics2(this.pageComic.offset).then(res =>{
          this.pageComic.countComic = res.data.count;
          this.pageComic.masComics = res.data.results;
            console.log(res.data.results);
            this.pageComic.comics = this.pageComic.comics.concat(this.pageComic.masComics);
            infiniteScroll.complete();
        })
    }
}
//Recojo Comics con un filtro nombre desde 0 el count
getSearchedComics(ev: any) {
    let texto = ev.target.value;
    this.pageComic.searchComic = texto;
    if(texto.length > 0){
        console.log('buscando por nombre....'+texto);
        this.api.searchComicByName(texto,undefined,false).then(
            res => {
              this.pageComic.comics = res.data.results;
              this.pageComic.countComic = res.data.count;
              this.pageComic.offset = res.data.offset;
                console.log(res.data);
                console.log(this.pageComic.countComic);
        });
    }
    if(texto == ''){
      this.getComics();
    }
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Año Invalido',
    subTitle: 'Debe ingresar año en formato de 4 digitos, eg: 2000',
    buttons: ['Cerrar']
  });
  alert.present();
}
//Recojo Comics con un filtro Ano desde 0 el count
getSearchedComicsbyYear(ev: any) {
    let year = ev.target.value;
    this.pageComic.searchByYear = year;
    if(year.toString().length == 4){
        console.log('buscando por año....'+year.toString());
        this.api.searchComicsByYear(year,undefined,false).then(
            res => {
              this.pageComic.comics = res.data.results;
              this.pageComic.countComic = res.data.count;
              this.pageComic.offset = res.data.offset;
                console.log(res.data);
                console.log(this.pageComic.countComic);
        });
    }
    if(year.toString().length < 4){
      this.getComics();
    }
    if(year.toString().length > 4){
        
        this.presentAlert();
        console.log("Resultados improbables debe ser numero de 4 digitos")
    }

}

//Recojo las informaciones de personajes desde 0 
getCharacters() {
  console.log("Cargando comics iniciales....")
  this.api.getCharacters2().then(
      res => {
          this.pageCharacter.characters = res.data.results;
          this.pageCharacter.countCharacters = res.data.count;
          this.pageCharacter.offset = res.data.offset;
          this.pageCharacter.searchByYear = 0;
          this.pageCharacter.searchCharacter = '';
  });
}

//Recojo mas informaciones de personajes y controlo si hay un filtro como nombre
//Count va aumentar de default 20/50
doInfiniteC(infiniteScroll) {

  if (this.pageCharacter.searchCharacter.length > 0 && this.pageCharacter.hide == true)
      {
          console.log("Buscando mas personajes por nombre...."+this.pageCharacter.searchCharacter);
          this.pageCharacter.offset += this.pageCharacter.countCharacters;
          this.api.searchCharcterByName(this.pageCharacter.searchCharacter,this.pageCharacter.offset).then(res =>{
              this.pageCharacter.countCharacters = res.data.count;
              this.pageCharacter.masCharacters = res.data.results;
              console.log(res.data.results);
              this.pageCharacter.characters=this.pageCharacter.characters.concat(this.pageCharacter.masCharacters);
              infiniteScroll.complete();
          }) 
      }
  if (this.pageCharacter.searchByYear.toString().length == 4 && this.pageCharacter.hide == false)
      {
          console.log("Buscando mas comics por año...."+this.pageCharacter.searchByYear); 
      }
  if ( this.pageCharacter.searchByYear < 4 && this.pageCharacter.searchCharacter.length == 0 ) {
      console.log("Buscando mas characters....");
      this.pageCharacter.offset += this.pageCharacter.countCharacters;
      this.api.getCharacters2(this.pageCharacter.offset).then(res =>{
        this.pageCharacter.countCharacters = res.data.count;
        this.pageCharacter.masCharacters = res.data.results;
          console.log(res.data.results);
          this.pageCharacter.characters = this.pageCharacter.characters.concat(this.pageCharacter.masCharacters);
          infiniteScroll.complete();
      }) 
  }
}
//Recojo Comics con un filtro Nombre desde 0 el count
getSearchedCharacters(ev: any) {
  let texto = ev.target.value;
  this.pageCharacter.searchCharacter = texto;
  if(texto.length > 0){
      console.log('buscando por nombre....'+texto);
      this.api.searchCharcterByName(texto,undefined,false).then(
          res => {
            this.pageCharacter.characters = res.data.results;
            this.pageCharacter.countCharacters = res.data.count;
            this.pageCharacter.offset = res.data.offset;
              console.log(res.data);
              console.log(this.pageCharacter.countCharacters);
      });
  }
  if(texto == ''){
    this.getCharacters();
  }
}

}
