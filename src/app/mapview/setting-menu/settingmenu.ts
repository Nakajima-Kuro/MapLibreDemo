import { ChangeDetectionStrategy, Component, Output, Input, EventEmitter } from '@angular/core';

import { FileService } from '../../services/fileservice';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-setting-menu',
  imports: [MatIconModule],
  templateUrl: './SettingMenu.html',
  styleUrl: './SettingMenu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingMenu {
  indexMenu: number = -1;

  constructor(private fileService: FileService) {}

  @Input() heatMapVisibility: boolean = false;
  @Input() heatMapOpacity: number = 0.5;

  @Output() heatMapVisibilityChange = new EventEmitter<boolean>(); // Emits a boolean value
  onHeatMapVisibilityChange(event: Event): void {
    this.heatMapVisibility = (event.target as HTMLInputElement).checked;
    this.heatMapVisibilityChange.emit(this.heatMapVisibility); // Emit the checked state
  }

  @Output() heatMapOpacityChange = new EventEmitter<number>(); // Emits a number value (0 to 1)
  onHeatMapOpacityChange(event: Event): void {
    this.heatMapOpacity = (event.target as HTMLInputElement).valueAsNumber / 100;
    this.heatMapOpacityChange.emit(this.heatMapOpacity); // Emit the checked state
  }

  openSettingMenu(index: number): void {
    this.indexMenu = index;
    this.fileService.emitExampleObservable('Hello from Settingform component!');
  }

  closeSettingMenu(index: number): void {
    if (this.indexMenu === index) {
      this.indexMenu = -1;
    }
  }
}
