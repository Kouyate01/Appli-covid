import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../service/authentification.service';
import { ToastController ,Platform } from '@ionic/angular'; 
import * as firebase from 'firebase';
import { Subject } from "rxjs";
import DataSnapshot=firebase.database.DataSnapshot;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatafinderService } from '../service/datafinder.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  myform:FormGroup;
  message:string;
  contact:string;
  longitude:any;
  latitude:any;
  data:any;
  body:any;

  url="http://localhost/api/index.php";

  constructor(private platform:Platform,private route:Router,private api:ApiService,private http:HttpClient,private builder:FormBuilder,private datasaver:DatafinderService,private  auth:AuthentificationService,private toast:ToastController,private geolocation:Geolocation) { 

          this.platform.ready().then(()=>{

              //on recupere la localisation de l'utilisateur
               this.geolocation.getCurrentPosition().then((resp)=>{

                  this.longitude=resp.coords.longitude;
                  this.latitude=resp.coords.latitude;


               }).catch((error) => {

                    this.toastShower(error,5000);
              });


               //this.nativedatabaseSqlite.createDB();
               //this.nativedatabaseSqlite.createTableUser();




          }).catch((e)=>console.log(e));



  }

  ngOnInit() {
   
             //le data de l'utilisateur
             this.myform=this.builder.group({
                //on construit le formulaire
                 name:["",Validators.required],

                 prenom:["",Validators.required],

                 phone:["",Validators.required],

                 email:["",Validators.required],

                 password:["",Validators.required],

                 sexe:["",Validators.required],

                 habitation:["",Validators.required],

                 fonction:["",Validators.required]
             })     
  }

 async onSubmit(){
  
  //on recupere les informations relative a l'utilisateur
   this.data={
 
     nom:this.myform.get("name").value,
     prenom:this.myform.get("prenom").value,
     email:this.myform.get("email").value,
     location:this.myform.get("habitation").value,
     phone:this.myform.get("phone").value,
     longitude:this.longitude,
     latitude:this.latitude,
     sexe:this.myform.get("sexe").value,
     fonction:this.myform.get("fonction").value,
     password:this.myform.get("password").value
   }

   if(this.myform.get("phone").value.length!=8){
      
      
        this.toast.create({
             message:"numero de téléphone invalide ",
             duration:5000,
             position:"top",
             color:"danger"
        }).then((user)=>user.present());


   }else{

       
        this.body={

           action:'add',
           data:this.data
       }

      // on cree un utilisatueur
      this.createUser(this.data.email,this.data.password);



     
       
      
   }

 }

//cette fonction permet de creer un utilisateur
 createUser(email,password){

//elle retourne une promise
     return new Promise((resolve,reject)=>{

          this.auth.CreateUser(email,password).then(


//si il  ya un success on stocke les informations dans firebase realtime

            (user:any)=>{

                //on verifie si tout est bon coté api 
                  this.api.PostData(this.body).subscribe((user:any)=>{this.toastShower(

                   user.message,5000).then((u)=>u.present());

                     //si le message est un message de success
                        
                          let responce=user; 

                          if(responce.message && responce.id){

                          if(responce.message=="compte cree avec success"){



                                 //On stocke les donée crée dans le sqlite natif

                               // this.nativedatabaseSqlite.insertRow(1,this.data.nom,this.data.prenom,this.data.email,
                               // this.data.phone,this.data.password,this.data.fonction,this.data.location,this.data.sexe);

                                this.datasaver.putData({id:responce.id}).then((v)=>console.log("bien stocké")).catch(e=>console.log(e));
                                this.route.navigate(['profile',{id:responce.id}]);
                                this.datasaver.putDataWithName("userData",this.data).then((v)=>console.log("data saved")).catch((e)=>console.log(e));

                                //on te redirige vers le profile

                          }


                     }


                      });
            },
            //l'erreur de firebase
            async(error)=>{
                    //permet d'afficher un toast
                    this.toastShower(error,5000).then((v)=>v.present());
                    console.log("error \t"+this.message);
            }

          );
     });     
      
 }



//il affiche le toast
async toastShower(message,duration){

   
    return this.toast.create({

            message:message,
            duration:duration,
            color:'primary',
            position:"top",
    });
  

}

}
