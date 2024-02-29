import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { StateEffect } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, basicSetup } from 'codemirror';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
})
export class CodeEditorComponent {
  @ViewChild('codemirror', { static: true }) codeMirrorElement!: ElementRef;

  editor!: EditorView;
  lang: any;
  ngOnInit(): void {
    const fixedHeightEditor = EditorView.theme({
      '&': { height: '17rem', width: '100%' },
      '.cm-scroller': { overflow: 'auto' },
    });
    this.editor = new EditorView({
      extensions: [
        basicSetup,
        this.lang ? this.lang : javascript(),
        oneDark,
        fixedHeightEditor,
      ],
      parent: this.codeMirrorElement.nativeElement,
    });
  }
  getLang(e: any) {
    const fixedHeightEditor = EditorView.theme({
      '&': { height: '17rem', width: '100%' },
      '.cm-scroller': { overflow: 'auto' },
    });
    switch (e.value) {
      case 'JavaSctipt':
        this.lang = javascript();
        break;
      case 'cpp':
        this.lang = cpp();
        break;
      case 'python':
        this.lang = python();
        break;
      case 'TypeScript':
        this.lang = javascript({ typescript: true });
        break;

      default:
        this.lang = javascript();
        break;
    }

    const toggle = (view: EditorView) => {
      let transection;
      if (e.value == 'cpp') {
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
        //         transection = view.state.replaceSelection(`#include <iostream>
        // int main() {
        //   std::cout << "Hello, World!" << std::endl;
        //   return 0;
        // }`);
        //         let update = view.state.update(transection);
        //         view.update([update]);
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
  getValue(): string {
    if (this.editor) {
      return this.editor.state.doc.toString();
    }
    return ''; // Handle potential errors or editor not initialized
  }
  showValue(e: MouseEvent) {
    e.preventDefault();
    const code = this.getValue();
    console.log(code);
  }
}
