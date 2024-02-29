import { Component, Input } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { HtmlParser, TemplateBinding } from '@angular/compiler';

@Component({
  selector: 'app-lesson-one',
  standalone: true,
  imports: [CodeEditorComponent],
  templateUrl: './lesson-one.component.html',
  styleUrl: './lesson-one.component.css',
})
export class LessonOneComponent {
  @Input() question!: string;
  @Input() input!: string;
  @Input() output!: HTMLElement;
}
