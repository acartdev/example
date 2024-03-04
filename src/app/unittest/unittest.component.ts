import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  RouterOutlet,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { LessonOneComponent } from '../lesson-one/lesson-one.component';
import { UnitType } from './unittestType';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FinishPageComponent } from '../finish-page/finish-page.component';
import { MatIconModule } from '@angular/material/icon';
import { LessonType } from '../code-editor/lessType';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../guards/auth.service';
import { DetailExitComponent } from '../detail-exit/detail-exit.component';
@Component({
  selector: 'app-unittest',
  providers: [],
  standalone: true,
  imports: [
    RouterOutlet,
    LessonOneComponent,
    NgIf,
    NgFor,
    FinishPageComponent,
    NgClass,
    MatIconModule,
    ReactiveFormsModule,
    DetailExitComponent,
  ],

  templateUrl: './unittest.component.html',
  styleUrl: './unittest.component.css',
})
export class UnittestComponent {
  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private loaction: ActivatedRoute
  ) {}
  @ViewChild('my_modal_5', { static: true }) dialog!: ElementRef;
  email?: string | null;
  isLoad: boolean = false;
  lesson?: LessonType;
  user_email!: string;
  count: number = 1;
  lessonValue?: LessonType[] = [];
  currentPath?: string;
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
    // console.log(this.count);

    if (action === 'next') {
      this.count += 1;
      if (this.count >= 6) {
        this.count = 6;
      }
    } else {
      this.count -= 1;
      if (this.count <= 1) {
        this.count = 1;
      }
    }
  }
  async ngOnInit(): Promise<void> {
    this.currentPath = this.loaction.snapshot.url[0].path;
    console.log(this.currentPath);

    await this.getEmail();
    this.isLoad = true;
    this.router.params.subscribe((pramsId) => (this.email = pramsId['email']));
    if (this.email) {
      this.lessonValue = await this.authService
        .getLessonDetail(this.email)
        .then((value) => {
          return value;
        });
    }
    // console.log(this.lessonValue);
    this.count = 1;
    this.isLoad = !this.isLoad;
  }
  async getEmail(): Promise<void> {
    const token = this.authService.getToken();
    if (!token) return;
    const profile: any = await this.authService
      .getProfile(token)
      .then((value) => value?.email)
      .catch((err) => null);
    this.user_email = profile;
  }
  rePage(page: number) {
    this.count = page;
    // console.log(this.count);
  }
  saveDataToStore(data: LessonType) {
    const index = this.lessonValue!.findIndex(
      (obj) => obj.lesson_id == data.lesson_id
    );
    if (index > -1) {
      this.lessonValue![index] = data;
    } else {
      this.lessonValue?.push(data);
    }

    // console.log(this.lessonValue);
  }
  findData(id: number): LessonType | undefined {
    return this.lessonValue?.find((value) => value.lesson_id == id);
  }
  checkOut() {
    this.dialog.nativeElement.style.display = 'none';
    this.authService.checkOut();
  }
  async onSubmit(): Promise<void> {
    this.isLoad = true;
    const res = await this.authService.sendLesson(this.lessonValue!);
    console.log(res);
    const updateStatus = await this.authService.updateStatus(
      this.lessonValue![0].user_email!
    );
    setTimeout(() => {
      this.isLoad = !this.isLoad;
      if (res && !this.isLoad && updateStatus) {
        this.dialog.nativeElement.showModal();
      }
    }, 2000);
  }
}
