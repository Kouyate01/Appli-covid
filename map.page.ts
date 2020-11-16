import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import L from "leaflet";
import { Geofence } from '@ionic-native/geofence/ngx';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: L.Map;
  center: L.PointTuple;
  startCoords:any;
  longitude:any;
  latitude:any;
  constructor(public http:HttpClient,public geolocation:Geolocation,public platform:Platform,private toast:ToastController) {
        
        this.center = this.startCoords;
    this.platform.ready().then(() =>
    { 
      this.geolocation.getCurrentPosition().then((resp)=>{

          this.startCoords=[resp.coords.latitude,resp.coords.longitude];
         
          this.leafletMap(resp.coords.latitude,resp.coords.longitude);

         

         

          
      }).catch((e)=>{

           this.showMyToast("Verifiez votre connection internet",5000);
      }) 
      
      
      this.geolocation.watchPosition().subscribe(position => {
        
          this.longitude=position.coords.longitude;
          this.latitude=position.coords.latitude;

     }); 
      
    })
        
   }

  ngOnInit() {
  }
  IonViewDidLoad(){
    



  }


  leafletMap(latitude,longitude)
  {
    this.map = L.map('mapId', 
    {
      center: [latitude,longitude],
      zoom: 18
    });



    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'www.tphangout.com', 
      maxZoom:18
    }).addTo(this.map);


  


    L.marker([latitude,longitude],{title:"Ma localisation"}).bindTooltip("ma position").openTooltip().addTo(this.map);
  

         this.map.setView([latitude, longitude], 16);
          let markerGroup = L.featureGroup();
          let marker: any = L.marker([latitude, longitude]);
          marker.bindPopup("<b>Ma position</b><br>").openPopup();
          markerGroup.addLayer(marker);
          this.map.addLayer(markerGroup);
          var circle = L.circle([latitude, longitude], {
              color: 'Green',
            fillColor: '#81C784',
            fillOpacity: 0.5,
            radius: 100
          }).addTo(this.map);

          circle.bindPopup(" Mon rayon ");


    

  

}


reload(evenement){

  setTimeout(()=>{

    evenement.target.complete();
    this.leafletMap(this.latitude,this.longitude);
    

  },2000);
  

}

showMyToast(message,duration){


 this.toast.create({
        message:message,
        color:"danger",
        duration:duration,
        position:"bottom"
 }).then((data)=> data.present())


}






}
