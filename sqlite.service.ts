import { Injectable } from '@angular/core';
import { SQLite ,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  databaseObj: SQLiteObject;
  row_data=[];
  readonly database_name: string = "alertCorona";
  //readonly table_name: string = "myfreakytable";

  constructor(private database:SQLite, private toast: ToastController) { }


  // Create DB if not there
  createDB() {

    this.database.create({
      name: this.database_name,
      location: 'default'
    }).then((db: SQLiteObject) => {

        this.databaseObj = db;

        return true;
       
     })
      .catch(e => {
       this.ShowToast("error " + JSON.stringify(e),"danger",5000);
      });

}

//on cree la table 
  createTableUser() {
    this.databaseObj.executeSql(`
    CREATE TABLE IF NOT EXISTS user  (id INTEGER PRIMARY KEY, nom varchar(255),prenom varchar(255),email varchar(255), numero varchar(255),mdp varhar(255),fonction varchar(255),localisation varchar(255),sexe varchar(255))
    `, [])
      .then(() => {
        return 'Table Created!';
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

 //table idenfiant
  createTableId(){

      this.databaseObj.executeSql('CREATE TABLE IF NOT EXIST id(id_usager INTEGER PRIMARY KEY , other INTEGER default 1'
        ,[]).then(()=>{
             
              return  true;
            
        }).catch(e=>{

             this.ShowToast("error","danger",5000);
        })
  }

  //recupere les donnees

  getUserId(){


     this.databaseObj.executeSql("SELECT id_usager from usager ",[]).then((res)=>{
 
        //On verifi si il ya des données
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
           //si yen a on les ajoutes dans le tableau 
            this.row_data.push(res.rows.item(i));

          }
             
          return this.row_data;
        }
           
     }).catch(e=>{

         this.ShowToast("erreur","danger",5000);
     });


  }

  //On insere dans usager
 InsertId(id){

    this.databaseObj.executeSql(`INSERT INTO usager(id_usager) VALUES (${id})`).then(()=>{

               
              return this.getUserId();

    }).catch(e=>{

         this.ShowToast("erreur","danger",5000);
    })


 }

//On insere les données dans la base de données

  insertRow(id,nom,prenom,email,numero,mdp,fonction,localisation,sexe) {
    // Value should not be empty

    //on cree la table usager
    this.databaseObj.executeSql(`
      INSERT INTO user(id,nom,prenom,email,numero,mdp,fonction,localisation,sexe) VALUES (${id},${nom},${prenom},${email},${numero},${mdp},${fonction},${localisation},${sexe})
    `, [])
      .then(() => {
        
        this.getRows();
      })
      .catch(e => {
        this.ShowToast("error " + JSON.stringify(e),"danger",5000);
      });
  }


//on recupere les colones 
  getRows() {

    this.databaseObj.executeSql(`
    SELECT * FROM user
    `
      , [])
      .then((res:any) => {
        this.row_data = [];

        //On verifi si il ya des données
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
           //si yen a on les ajoutes dans le tableau 
            this.row_data.push(res.rows.item(i));

          }
             
          return this.row_data;
        }
      })
      .catch(e => {

         this.ShowToast("error " + JSON.stringify(e),"danger",5000);

      });
  }


// cette fonction affiche un toast
  ShowToast(message,color,duraction){

     this.toast.create({
        message:message,
        color:color,
        duration:duraction,
        position:"bottom"
     }).then((u)=>u.present());
  }

}
