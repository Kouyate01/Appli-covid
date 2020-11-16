import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatafinderService {

  constructor(private sotrage:NativeStorage) { }

 //putData on native storage
  putData(value){

     return this.sotrage.setItem("user",value);
  }
  //getNative sotrage data
  getData(){

    return this.sotrage.getItem("user");

  }
  //put data with name
  putDataWithName(name,value){

      return this.sotrage.setItem(name,value);
  }
  //get data with name
  getDataWithName(name){

     return this.sotrage.getItem(name);
  }
}
