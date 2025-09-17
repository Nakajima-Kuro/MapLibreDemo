import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Settingform } from './settingform';

describe('Settingform', () => {
  let component: Settingform;
  let fixture: ComponentFixture<Settingform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settingform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Settingform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
