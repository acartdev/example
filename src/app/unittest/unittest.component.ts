import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonOneComponent } from '../lesson-one/lesson-one.component';
import { UnitType } from './unittestType';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FinishPageComponent } from '../finish-page/finish-page.component';
import { MatIconModule } from '@angular/material/icon';
import { LessonType } from '../code-editor/lessType';
@Component({
  selector: 'app-unittest',
  standalone: true,
  imports: [
    RouterOutlet,
    LessonOneComponent,
    NgIf,
    NgFor,
    FinishPageComponent,
    NgClass,
    MatIconModule,
  ],

  templateUrl: './unittest.component.html',
  styleUrl: './unittest.component.css',
})
export class UnittestComponent {
  @Input() lesson?: LessonType;
  count: number = 1;
  lessonValue: LessonType[] = [];
  unitTest: UnitType[] = [
    {
      lessId: 1,
      question:
        '1.จงเขียนโปรแกรมให้ได้ผลลัพธ์ดัง Output *คำอธิบาย Input จะเป็นจำนวนชั้นตามตัวอย่าง',
      input: '3',
      output: `
      <div class="mockup-code min-w-52 sm:min-w-2/3" >
      <pre ><code>&nbsp;&nbsp;&nbsp;&nbsp;*</code></pre>
      <pre ><code>&nbsp;&nbsp;&nbsp;***</code></pre>
      <pre ><code>&nbsp;&nbsp;*****</code></pre>
</div>
`,
    },
    {
      lessId: 2,
      question:
        '2.จงเขียนโปรแกรมให้ได้ผลลัพธ์ดัง Output  *คำอธิบาย Input จะเป็นจำนวนชั้น ตามตัวอย่าง ',
      input: '3',
      output: `
      <div class="mockup-code min-w-52 sm:min-w-2/3" >
      <pre ><code>*</code></pre>
      <pre ><code>***</code></pre>
      <pre ><code>*****</code></pre>
</div>
`,
    },
    {
      lessId: 3,
      question: '3.จงอธิบายหลักการทำงานของ DNS Server *อธิบายตามความเข้าใจ',
      input: '',
      output: '',
    },
    {
      lessId: 4,
      question:
        '4.จงเขียนฟังก์ชันให้ได้ผลลัพธ์ดัง Output  *คำอธิบาย จะเป็นการบวกเลขไปเรื่อยๆ เช่น 1+2+3+...+n Input จะเป็นจำนวน n ครั้ง *ข้อกำหนด ฟังก์ชัน TimeComplexity จะต้องเป็น O(1) ',
      input: '3',
      output: `
      <div class="mockup-code min-w-52 sm:min-w-2/3" >
      <pre ><code>Output: 6</code></pre>
      
</div>
`,
    },
    {
      lessId: 5,
      question: '5.หากระบบเราโดน BruteForce (สุ่มรหัส) จะมีวิธีแก้ไขอย่างไร',
      input: '',
      output: '',
    },
  ];
  onChildClick(action: string) {
    if (action === 'next') {
      this.count += 1;
    } else {
      this.count -= 1;
    }
  }

  rePage(page: number) {
    this.count = page;
    // console.log(this.count);
  }
  getLessonId(id: number): LessonType {
    const index = this.lessonValue.findIndex((obj) => obj.lessId == id);
    return this.lessonValue[index];
  }
  saveDataToStore(data: LessonType) {
    const index = this.lessonValue.findIndex(
      (obj) => obj.lessId == data.lessId
    );
    if (index > -1) {
      this.lessonValue[index] = data;
    } else {
      this.lessonValue.push(data);
    }

    console.log(this.lessonValue);
  }
}
