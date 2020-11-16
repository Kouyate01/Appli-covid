import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { AuthentificationService } from '../service/authentification.service'; 
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase'; 
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { DatafinderService } from '../service/datafinder.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {

  myform:FormGroup;
  constructor(private data:DatafinderService,private router:Router,private api:ApiService,private builder:FormBuilder,private auth:AuthentificationService,private toast:ToastController) { }

  ngOnInit() {

     this.myform=this.builder.group({


          email:["",Validators.required],
          password:["",Validators.required]
       
     })
  }


  onSubmit(){

   

             this.verifyMydata(this.myform.get("email").value,this.myform.get("password").value);

            
 

  }


   verifyMydata(email:string,password:string){


    return new Promise((resolve,reject)=>{

           
          this.auth.ConnecteUser(email,password).then((user)=>{


                  this.api.getData(this.myform.get("email").value,this.myform.get("password").value).subscribe(

                (user:any)=>{

                      if(user.message=="Aucun utilisateur avec ce mail"){

                             this.toast.create({

                                    position:"top",
                                    duration:5000,
                                    message:"Verifiez vos coordonnées",
                                    color:"danger"  

                             }).then((u)=>u.present());
                      }else{

                            this.data.putData({id:user.id_usager}).then((v)=>{console.log("ok")}).catch((e)=>console.log(e));
                            this.router.navigate(['/profile',{id:user.id_usager}]);
                            

                      }


              


                },(error)=>{


                        this.toast.create({

                                    position:"top",
                                    duration:5000,
                                    message:"Verifiez votre connection",
                                    color:"danger"  

                             }).then((u)=>u.present());


                }

               );

          },

          async (error)=>{

                 this.toast.create({
                    message:error,
                    duration:5000,
                    color:'danger'
                 }).then( (value)=>{

                      value.present();
                 },
                  (error)=>{

                        console.log(error);
                  })

                 



          }


          )


    })

  }

}
