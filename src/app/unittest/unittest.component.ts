import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LessonOneComponent } from '../lesson-one/lesson-one.component';
import { UnitType } from './unittestType';
@Component({
  selector: 'app-unittest',
  standalone: true,
  imports: [RouterOutlet, LessonOneComponent],
  templateUrl: './unittest.component.html',
  styleUrl: './unittest.component.css',
})
export class UnittestComponent {
  unitTest: UnitType[] = [
    {
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
  ];
}
