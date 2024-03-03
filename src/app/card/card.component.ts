import { Component, Input } from '@angular/core';
import { LessonDetail } from '../guards/dto/lessonDetail.dto';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() lessonDetail?: LessonDetail | null;
}
