import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-exit',
  standalone: true,
  imports: [],
  templateUrl: './detail-exit.component.html',
  styleUrl: './detail-exit.component.css',
})
export class DetailExitComponent {
  constructor(private router: Router) {}
  @Output() repage = new EventEmitter<number>();
  goback() {
    this.router.navigate(['/admin']);
  }
}
