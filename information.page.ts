import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovidService } from '../covid.service';
import { Chart } from 'chart.js';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  
   @ViewChild('mychart',{static:false}) mychart;
  country:any;
  graph:any;
  detail:any;
  nom:any;

  countryDetail:any;

  constructor(private route:ActivatedRoute,private service:CovidService,private toast:ToastController) {


     this.country=this.route.snapshot.paramMap.get('pays');

     this.service.getTheCountry(this.country).subscribe(



         (data)=>{


                   console.log(data);

                   this.countryDetail=data;

                   this.createBarChart();

         },


         (error)=>{




         }
    

         ); 

     this.service.getCountryData(this.country).subscribe(


         (data)=>{

              this.detail=data;


              this.nom=this.detail[0].Country;


              

         },

         (error)=>{


           this.presentMyToast();

              
         }


       );


       


  }

  
  ngOnInit() {

    

  }


  createBarChart() {

    if(this.countryDetail!=undefined){

          this.graph=new Chart(this.mychart.nativeElement,{
   


    
     type:'doughnut',
     data:{



         labels:['cas','mort','guerrison'],
         datasets:[{

             label:'world',
             data:[this.countryDetail.cases,this.countryDetail.deaths,this.countryDetail.recovered],
             backgroundColor:['dodgerblue','red','forestgreen'],
             borderColor:['rgba(0,0,0,0.5)'],
             borderWidth:1
         },
         ]


      },
      options:{

 
            scales:{

                  
            }

      }


    })


   }


  
  }


  doRefresh(evenement){


    setTimeout(() => {  
      
      evenement.target.complete();



     this.service.getTheCountry(this.country).subscribe(



         (data)=>{this.countryDetail=data;},


         (error)=>{this.presentMyToast();

         }
    

    ); 
  

    this.service.getCountryData(this.country).subscribe(
    (data)=>{this.detail = data;  

     },(error)=>{this.presentMyToast();})

    }, 2000);

  }


  async presentMyToast(){

 const toasts = await this.toast.create(   
           {
                      
                message: 'Erreur lors du chargement des données',
                duration: 10000,
                color:'danger'
           });
                    
          toasts.present();
  }

}
