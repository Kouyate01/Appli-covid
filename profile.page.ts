import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController,ActionSheetController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AuthentificationService } from '../service/authentification.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DatafinderService } from '../service/datafinder.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

   data;
   isConn=false;
   ProfileInfo:any;
  constructor(private saver:DatafinderService,private native:NativeStorage,private auth:AuthentificationService,private action:ActionSheetController,private call:CallNumber,private platform:Platform,private api:ApiService,private active:ActivatedRoute,private toast:ToastController) {
      
      this.platform.ready().then(()=>{

       
          
                

                   this.data=this.active.snapshot.params["id"];

                   if(this.data==null && this.data==undefined){
                       //au cas on pert les données on recuperes l'id present dans le cache
                        this.saver.getData().then(

                            (u)=> this.data=u.id

                        ).catch((e)=>console.log(e));
                   }

      
                   this.api.ShowProfile(this.data).subscribe((user:any)=>{
                 
                        this.ProfileInfo=user;
                        this.isConn=true;



                  },
             


                 (error)=>{

                    

                    this.isConn=false;

                    if(this.ProfileInfo==null && this.ProfileInfo==undefined){
                      
                        this.saver.getDataWithName("userData").then((v)=>this.ProfileInfo=v).catch((e)=>console.log(e))
                    }

                 })


           

           

              });
     


  }

  ngOnInit() {
  }
  

 getUserData(id){

 	  this.api.ShowProfile(id).subscribe((user:any)=>{
         
         console.log(user);

        
 	  },

 	  (error)=>{

 	  	   this.showToast("verifiez votre connection | reload page","danger",5000);
 	  }

 	  )

 }

 showToast(message,color,duration){

 	  this.toast.create({
 	  	 message:message,
 	  	 color:color,
 	  	 duration:duration,
 	  	 position:"bottom"
 	  }).then((u)=>u.present());

 }

 reload(evenement){

   setTimeout(()=>{

    evenement.target.complete();
    this.isConn=false;
    this.saver.getDataWithName("userData").then((v)=>this.ProfileInfo=v).catch((e)=>console.log(e))

   },1000);

 }


 openModal(){

   this.action.create({

       
       header:"Numero d'urgence",
       buttons:[
           
           {

               text:"143",
               icon:"call",
               handler:()=>{

                    this.CallThis("143");
               }
               

           },{

            
                 text:"101",
                 icon:"call",
                 handler:()=>{

                     this.CallThis("101");
                 }

           },{


                 text:"cancel",
                 role:"cancel"
           }

       ]
   }).then((user)=>{

       user.present();
   })
}



 CallThis(number:any){


  this.call.callNumber(number,true).then((res)=>{




  },
 
  (err)=>{


         this.showToast("call impossible","danger",5000);
  }

  )

}


deconnecte(){


 this.auth.signOut();

}



}
