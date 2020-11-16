import { Component } from '@angular/core';
import { AuthentificationService } from './service/authentification.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate:any={};
  isAuth:boolean;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private routage:Router,
    private auth:AuthentificationService
  ) {
      this.initializeApp();
      this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      var firebaseConfig = {

        apiKey: "AIzaSyBXQcT0SzfCypNDdOaO-JYKWPJlfzYzEW8",
        authDomain: "alertecorona-007.firebaseapp.com",
        databaseURL: "https://alertecorona-007.firebaseio.com",
        projectId: "alertecorona-007",
        storageBucket: "alertecorona-007.appspot.com",
        messagingSenderId: "130333240942",
        appId: "1:130333240942:web:c6f493d4bfcf52dfcdc07f",
        measurementId: "G-D8YEKNDE3Z"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.storage();
  firebase.firestore();
  firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.routage.navigate(["/profile"]);
          } else {

             if(!user){

                this.isAuth = false;
                this.routage.navigate(["/authentification"]);
             }

          }
        }
      ); 
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
     this.navigate =
    [
      {
        title : "Accueil",
        url   : "/tabs/tab1",
        icon  : "home"

      },
      {
        title : "recherche",
        url   : "tabs/tab2",
        icon  : "search"
      },
      {
        title : "Plus",
        url   : "tabs/tab3",
        icon  : "pulse"
      },
      {
        title : "Profil",
        url   : "profile",
        icon  : "person"
      },{
        title : "actualty",
        url   : "tabs/actuality",
        icon  : "globe"
      },{
         title:"map",
         url:"map",
         icon:"pin",
      }
    ]
  }


logout(){


     this.auth.signOut();
}

}
