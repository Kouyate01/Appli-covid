import { Component } from '@angular/core';
import { CovidService } from '../covid.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countries: any = null;
  searchCountry: any;
  getCountry:any;

  constructor(private covidService: CovidService,private Routage:Router,private toast:ToastController) { 

    this.covidService.getCountries().subscribe((data)=>{
      this.countries = data;
    },
    (error)=>{


          this.presentMyToast();


    }
    );

  }


  goToCountry(mycountry){



    this.Routage.navigate(['information',{pays:mycountry}]);



  }


  async presentMyToast(){



     

          const toasts = await this.toast.create({
                      
                      message: 'Veuillez verifier votre connection',
                      duration: 10000,
           });
                    
          toasts.present();

             


  }


  doRefresh(evenement){


    setTimeout(() => {  
      
      evenement.target.complete();

    this.covidService.getCountries().subscribe(
    (data)=>{
         
           this.countries = data;
           
           
     },
         
         (error)=>{
              this.presentMyToast();
         })


    }, 2000);


  }

}
