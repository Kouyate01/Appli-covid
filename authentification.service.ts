import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot= firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


//ce service permet d'authentifier un User via firebase

   isAuth:boolean;

  constructor() {

//au changement d'authentification
  

   }

//create des utilisateurs
   CreateUser(email:string,password:string){


      return  firebase.auth().createUserWithEmailAndPassword(email,password);


   }

//connecter des utilisateurs
   ConnecteUser(email:string,password:string){


      return firebase.auth().signInWithEmailAndPassword(email,password);

   }
   //methode de deconnection
   
   signOut() {
    firebase.auth().signOut();
   }
   //connection

   SaveData(mydata){



        return firebase.database().ref("PersonData").push(mydata);

   }

   GetUserData(){
      

          firebase.database().ref("PersonData").on("child_added",(data:firebase.database.DataSnapshot)=>{

                   return  data.key;
         });

   }
}
