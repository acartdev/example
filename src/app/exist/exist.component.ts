import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-exist',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './exist.component.html',
  styleUrl: './exist.component.css',
})
export class ExistComponent {
  constructor(private authService: AuthService) {}
  counts?: number | undefined;
  async ngOnInit(): Promise<void> {
    this.counts = await this.getCout();
  }
  checkOut(): void {
    this.authService.checkOut();
  }
  async getCout(): Promise<number | undefined> {
    const token = this.authService.getToken();
    if (!token) return undefined;
    const email: string | undefined = await this.authService
      .getProfile(token)
      .then((value) => value?.email)
      .catch(() => undefined);
    if (!email) return undefined;
    return await this.authService.countLesson(email).then((value) => {
      return value;
    });
  }
}
