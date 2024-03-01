import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-finish-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './finish-page.component.html',
  styleUrl: './finish-page.component.css',
})
export class FinishPageComponent {
  @Output() repage = new EventEmitter<number>();
}
