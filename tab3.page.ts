import { Component } from '@angular/core';
import { AuthentificationService } from '../service/authentification.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private auth :AuthentificationService) {



            console.log(this.auth.GetUserData());

  }

}
