import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders}from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

   server:string="https://appareil.000webhostapp.com/index.php";
  constructor(private http:HttpClient) { }


  PostData(body){

     
   
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

     return this.http.post(this.server,JSON.stringify(body),{headers:headers});
 }


//renvoi les données utilisateurs
 getData(email,password){

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

      return this.http.get(`${this.server}?action=user&email=${email}&mdp=${password}`,{headers:headers});

 }

//permet de tracer une personne
 Tracert(email){

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


     return this.http.get(`${this.server}?action=tracert&email=${email}`,{headers:headers});

 }
 //renvoi la goeolaction
 getLocation(email){

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  
    return this.http.get(`${this.server}?action=geolocation&email=${email}`,{headers:headers});


 }
 //draw map
 
 DrawMap(localisation){
 
     let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

      return this.http.get(`${this.server}?action=map&local=${localisation}`,{headers:headers});

 }

 //showProfile
 
 ShowProfile(id){

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

      return this.http.get(`${this.server}?action=user&id=${id}`,{headers:headers});

 } 







}
