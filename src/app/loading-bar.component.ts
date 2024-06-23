import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  template: `
    @if(visable) {
      <mat-progress-bar color="primary" mode="indeterminate"></mat-progress-bar>
    }
  `,
  styles: ``
})
export class LoadingBarComponent {
  @Input() visable: boolean = true
}
