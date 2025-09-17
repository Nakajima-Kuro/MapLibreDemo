import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settingform',
  imports: [MatIconModule],
  templateUrl: './settingform.html',
  styleUrl: './settingform.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settingform {
  @Input() heatMapVisibility: boolean = false;
  @Input() heatMapOpacity: number = 0;

  @Output() heatMapVisibilityChange = new EventEmitter<boolean>(); // Emits a boolean value
  onHeatMapVisibilityChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.heatMapVisibilityChange.emit(isChecked); // Emit the checked state
  }

  @Output() heatMapOpacityChange = new EventEmitter<number>(); // Emits a number value (0 to 1)
  onHeatMapOpacityChange(event: Event): void {
    const opacity = (event.target as HTMLInputElement).valueAsNumber / 100;
    this.heatMapOpacityChange.emit(opacity); // Emit the checked state
  }

  @Output() settingMenuClose = new EventEmitter(); // Emits a number value (0 to 1)
  onSettingMenuClose(): void {
    this.settingMenuClose.emit(); // Emit menu close event
  }

}
