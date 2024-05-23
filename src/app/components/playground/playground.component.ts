import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {

  data: any | undefined;
  
  constructor(private store: FirestoreService) {}


  // async checkMethod() {
  //   const response = this.store.getDocumentReference(
  //     "users", 
  //     "iFVsmzcTA9eRnLWCE9q3"
  //   )
  //   this.data = response

  // }

}
