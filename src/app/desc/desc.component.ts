import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-desc',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './desc.component.html',
  styleUrl: './desc.component.css',
})
export class DescComponent {}
