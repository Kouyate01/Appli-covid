import { Component, OnInit } from '@angular/core';
import { ToastController,ActionSheetController} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.page.html',
  styleUrls: ['./suivi.page.scss'],
})
export class SuiviPage implements OnInit {

  constructor(private toast:ToastController,private Action:ActionSheetController,private numbre:CallNumber) {}

  ngOnInit() {
  }

  
async showToast(message,duration){


  await this.toast.create({

     message:message,
     duration:duration,
     position:"bottom",
     color:"danger"

  }).then((data)=>{

       data.present();
  })

}


openModal(){

   this.Action.create({

       
       header:"Numero d'urgence",
       buttons:[
           
           {

               text:"143",
               icon:"call",
               handler:()=>{

                    //this.CallThis("143");
               }
               

           },{

            
                 text:"101",
                 icon:"call",
                 handler:()=>{

                   //  this.CallThis("101");
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

}
