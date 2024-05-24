import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CatsService } from '../../services/cats.service';


import { CardComponent } from '../../components/card/card.component';
import { SectionComponent } from '../../components/section/section.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, CardComponent, SectionComponent, LoaderComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent implements OnInit {

  user: any
  isLoading: boolean = true
  cards: any[]= [
    {
      'title' : 'Monet',
      'description' : 'Looking for snacks! 😼',
      'imgSrc': '',
      'btnLabel': 'Purr!',
      'btnAction': this.logSomething
    },
    {
      'title' : 'Picasso',
      'description' : 'Sleeping...😴😴😴',
      'imgSrc': '',
      'btnLabel': 'Meow!',
      'btnAction': this.logSomething
    },
    {
      'title' : 'Romeo',
      'description' : 'Zooming around...👀',
      'imgSrc': '',
      'btnLabel': 'Purr!',
      'btnAction': this.logSomething
    },




  ]
  constructor(private router: Router, private cat:CatsService, private auth: AuthService ) {
    
  }

  ngOnInit(): void {

    this.auth.user.subscribe(
      (user) => {
        if (user) {
        this.user = user
        } else {
          this.router.navigate(['/'])
        }
  
      }
    )
    this.updateImageSources().then(
      () => this.isLoading = false
    );
  }
  

async updateImageSources() {
  const promises = this.cards.map((card, index) => {
    return this.cat.getCatImageUrl().then(imageUrl => {
      this.cards[index].imgSrc = imageUrl;
    });
  });

  await Promise.all(promises);
}

  logSomething () {
    alert('meow meow')
  }


}
