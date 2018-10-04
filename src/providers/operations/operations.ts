import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from '../../../node_modules/firebase';

/*
  Generated class for the OperationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OperationsProvider {

  storageRef : any ;
  imagesRef : any ;

  arregloDias = ['Domenica','Lunedi',"Martedi","Mercoledi","Giovedi","Venerdi","Sabato"];
  arregloMese=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  arregloDiasOrasTotales:any=[0,0];

  constructor() {
    this.storageRef = firebase.storage().ref();
    this.imagesRef = this.storageRef.child('imags');
  }
  //regresa la data adecuada , formateada bien
  getDateFormat()
    {
      var date = new Date();
        var options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        return ""+date.toLocaleTimeString("en-us", options);
    }
    //Regreso de los dia y mese en Italiano
     getArregloGiorniMesi(){
       return [this.arregloDias,this.arregloMese];
     }

     //Encuentro el dia que necesito y almaceno sus eventos y horas realizadas y lo regreso!
     findDay(di,month,year,currentEvents){
      var tmp2 : number =0;
      var tmp = ["",0];  //todos los lugares y el tiempo recurrido
      let filtrados = currentEvents.filter(day=> {
            return (day.date===di&& day.month ===month&&day.year===year);
      });
      if (filtrados[0]!=null){
        this.arregloDiasOrasTotales[0]++;
          filtrados[0].eventos.forEach(element => {
            var app = new Date("January 31 1980 "+ element.tiempo);
            tmp[0] += element.lugar + "("+app.getHours()+") ";
            tmp2 += app.getHours();
          });
      }
      tmp[1] = tmp2;
      this.arregloDiasOrasTotales[1]+=tmp2;
      return tmp;
    }
    //genero las tupas de la table que necesito!
    myFunctionCalendar(year,month,currentEvents) {
      this.arregloDiasOrasTotales = [0,0]; //mantener iniciado siempre que quiero crear nueo pdf!
      var arreglo=[];
          var d = new Date(year,month + 1, 0) //setiembre
          var tmp =d.getDate(); //scorrere tot giorni.
          
          for(var i=1;i<=tmp;i++){
            var app2 = new Date(year,month,i);//settiembre
            
            if(app2.getDay()==0){
              arreglo.push([this.arregloMese[month]+" - "+i,this.arregloDias[app2.getDay()],"niente lavoro","niente lavoro"]);
            }
            else{
              var app =  this.findDay(i,month,year,currentEvents);
              if(app[1]!=0){
                arreglo.push([this.arregloMese[month]+" - "+i,this.arregloDias[app2.getDay()],app[0],app[1]]);
              }
            }
          }
          return arreglo;
      }
      //regreso de array con dias y oras totales del calendario !
  getArregloTotali(){
    return this.arregloDiasOrasTotales;
  }

}

