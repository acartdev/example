import { Component, Input } from '@angular/core';
import { LessonDetail } from '../guards/dto/lessonDetail.dto';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private router: Router) {}
  @Input() time?: string;
  @Input() lessonDetail?: LessonDetail | null;
  seeDetail(email: string) {
    this.router.navigate([`/detail/${email}`]);
  }
}
