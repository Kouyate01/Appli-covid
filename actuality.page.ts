import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';
import { ToastController,ActionSheetController} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-actuality',
  templateUrl: './actuality.page.html',
  styleUrls: ['./actuality.page.scss'],
})
export class ActualityPage implements OnInit {


  data:any; 
  mydate:any;
  constructor(private auth:CovidService,private toast:ToastController,private Action:ActionSheetController,private numbre:CallNumber) {
  
   
      this.getCountryData();

      


 
   }



  ngOnInit() {
  }


  getCountryData(){

    this.auth.getTheCountry("Ivory coast").subscribe((data)=>{

      this.data=data;
      console.log(this.data);
    },

    (Error)=>{

               this.showToast("Actualisez la page | Erreur de connection",5000);

    }


    )

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

doRefresh(evenement){


   setTimeout(()=>{

        evenement.target.complete();
       this.auth.getTheCountry("Ivory coast").subscribe((data)=>{

           this.data=data;
       },
       (Error)=>{


              this.showToast("Erreur de connection",5000);
       })

   },2000);

    
}


CallThis(number:any){


  this.numbre.callNumber(number,true).then((res)=>{




  },
 
  (err)=>{


         this.showToast("call impossible",5000);
  }

  )

}

  
}
