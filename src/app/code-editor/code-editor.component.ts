import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { EditorState, StateEffect } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, basicSetup } from 'codemirror';
import { LessonType } from './lessType';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, JsonPipe],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent {
  constructor(private authService: AuthService) {}
  @ViewChild('codemirror', { static: true }) codeMirrorElement!: ElementRef;
  @Output() lesson = new EventEmitter<LessonType>();
  @Output() perpage = new EventEmitter<string>();
  @Input() lessId!: number;
  @Input() input!: string;
  @Input() oldVal?: LessonType;
  @Input() readonly!: boolean;
  @Input() user_email!: string;
  editor!: EditorView;
  text!: string;
  lang: any;
  @Output() isload = new EventEmitter<boolean>();
  langValue?: string = 'JavaScript';

  ngOnInit(): void {
    setTimeout(() => {
      if (this.oldVal?.lang) {
        this.langValue = this.oldVal?.lang;
      }
      if (this.readonly) {
        this.reLang(this.oldVal?.lang!);
      }
      this.text = this.oldVal?.text ? this.oldVal.text : '';
      const fixedHeightEditor = EditorView.theme({
        '&': { height: '17rem', width: '110%' },
        '.cm-scroller': { overflow: 'auto' },
      });
      this.editor = new EditorView({
        doc: this.oldVal?.text ? this.oldVal.text : '',

        extensions: [
          EditorState.readOnly.of(this.readonly),
          basicSetup,
          this.lang ? this.lang : javascript(),
          oneDark,
          fixedHeightEditor,
        ],
        parent: this.codeMirrorElement.nativeElement,
      });
      this.isload.emit(false);
    }, 500);
  }

  getLang(e: any) {
    const fixedHeightEditor = EditorView.theme({
      '&': { height: '17rem' },
      '.cm-scroller': { overflow: 'auto' },
    });
    this.langValue = e.value;
    this.reLang(e.value);
    const toggle = (view: EditorView) => {
      if (e.value == 'Cpp') {
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: `#include <iostream>
int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`,
          },
        });
      } else {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: '' },
        });
      }

      view.dispatch({
        effects: StateEffect.reconfigure.of({
          extension: [basicSetup, this.lang, oneDark, fixedHeightEditor],
        }),
      });
    };
    toggle(this.editor);
  }
  reLang(lang: string | null): void {
    switch (lang) {
      case 'JavaSctipt':
        this.lang = javascript();
        break;
      case 'Cpp':
        this.lang = cpp();
        break;
      case 'Python':
        this.lang = python();
        break;
      case 'TypeScript':
        this.lang = javascript({ typescript: true });
        break;

      default:
        this.lang = javascript();
        break;
    }
  }
  getValue(): string {
    if (this.editor) {
      return this.editor.state.doc.toString();
    }
    return '';
  }
  async showValue(e: MouseEvent, action: string): Promise<void> {
    e.preventDefault();

    const code: LessonType = {
      user_email: this.user_email,
      lesson_id: this.lessId,
      text:
        this.lessId === 3 || this.lessId === 5 ? this.text : this.getValue(),
      lang: this.lessId === 3 || this.lessId === 5 ? 'Text' : this.langValue,
    };
    this.lesson.emit(code);
    this.perpage.emit(action);
  }
}
