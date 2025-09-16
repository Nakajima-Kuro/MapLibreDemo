import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapview } from './mapview';

describe('Mapview', () => {
  let component: Mapview;
  let fixture: ComponentFixture<Mapview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mapview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mapview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
