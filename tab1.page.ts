import { Component,ViewChild } from '@angular/core';
import { CovidService } from '../covid.service';
import  { Chart } from 'chart.js';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('mychart',{static:false}) mychart;

  info: any = null;
  bars:any;


  constructor(private covidService: CovidService,private toast:ToastController) { 

    this.covidService.getAll().subscribe(
   (data)=>{
      this.info = data;
      this.createBarChart();
      console.log(this.info);
    },
    
    (error)=>{
         this.presentMyToast();
    })


 }
  



 doRefresh(evenement){


    setTimeout(() => {  
      
      evenement.target.complete();

    this.covidService.getAll().subscribe(
    (data)=>{
         
           this.info = data;
           this.createBarChart();
           console.log(this.info);
     },
         
         (error)=>{
              this.presentMyToast();
         })


    }, 2000);


 }
  



  async presentMyToast(){



     

          const toasts = await this.toast.create({
                      
                      message: 'Veuillez verifier votre connection',
                      duration: 10000,
           });
                    
          toasts.present();

             


  }
  
  

  createBarChart(){

 


    this.bars=new Chart(this.mychart.nativeElement,{
   


    
     type:'pie',
     data:{



         labels:['cas','mort','guerrison'],
         datasets:[{

             label:'world',
             data:[this.info.cases,this.info.deaths,this.info.recovered],
             backgroundColor:['dodgerblue','red','forestgreen'],
             borderColor:['rgba(0,0,0,0.9)'],
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
