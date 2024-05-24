import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() imgSrc?: string 
  @Input() title?: string 
  @Input() description?: string 
  @Input() btnLabel?: string 
  @Input() btnAction?: Function 
  @Output() cardCycled = new EventEmitter<number>();


  cycleCard(id: number) {
    this.cardCycled.emit(id);
  }
}
