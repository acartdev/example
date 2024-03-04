import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { HtmlParser, TemplateBinding } from '@angular/compiler';
import { LessonType } from '../code-editor/lessType';
import { JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-lesson-one',
  standalone: true,
  imports: [CodeEditorComponent, NgIf, NgFor, JsonPipe],
  templateUrl: './lesson-one.component.html',
  styleUrl: './lesson-one.component.css',
})
export class LessonOneComponent {
  @Output() perPage = new EventEmitter<string>();
  @Output() lessonData = new EventEmitter<LessonType>();
  @Input() question!: string;
  @Input() input!: string;
  @Input() output!: HTMLElement;
  @Input() lessId!: number;
  @Input() oldValues?: LessonType;
  @Input() readonly!: boolean;
  @Input() user_email!: string;
  isLoad: boolean = false;

  @Output() lesson = new EventEmitter<LessonType>();
  saveData(data: LessonType) {
    this.lessonData.emit(data);
  }
  onChildClick(action: string) {
    this.perPage.emit(action);
  }
  isLoadProcess(load: boolean) {
    this.isLoad = load;
  }
}
