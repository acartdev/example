import { LessonDetail } from './../guards/dto/lessonDetail.dto';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../guards/auth.service';
import { Avgs } from '../guards/dto/avg.dto';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIconModule, CardComponent, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private authService: AuthService) {}
  isLoad: boolean = true;
  avg?: Avgs | null;
  sum: number = 0;
  lessonDetail?: LessonDetail[] | null;

  async ngOnInit(): Promise<void> {
    let len: number | undefined = 0;
    this.avg = await this.authService
      .getAvg()
      .then((value) => value)
      .catch(() => null);
    this.lessonDetail = await this.authService
      .findeDetail()
      .then((value) => {
        len = value?.length;
        return value?.map((items) => {
          if (items.avgtime) {
            this.sum += Number(items.avgtime);
          }
          const create_date = new Date(items.create_at).toLocaleDateString(
            'th-TH'
          );
          const create_time = new Date(items.create_at).toLocaleTimeString(
            'th-TH',
            {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }
          );
          const send_date = new Date(items.send_at).toLocaleDateString('th-TH');
          const send_time = new Date(items.send_at).toLocaleTimeString(
            'th-TH',
            {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }
          );

          if (+items.avgtime >= 0 && +items.avgtime < 1) {
            items.avgtime = parseFloat(items.avgtime.toString());
          }

          items.create_at = create_date + ' เวลา ' + create_time;
          items.send_at = send_date + ' เวลา ' + send_time;
          return items;
        });
      })
      .catch(() => null);
    this.sum = this.sum / len;
    if (+this.sum >= 0 && +this.sum < 1) {
      this.sum = parseFloat(this.sum.toString());
    }
    this.isLoad = !this.isLoad;
  }
  checkOut() {
    this.authService.checkOut();
  }
}
