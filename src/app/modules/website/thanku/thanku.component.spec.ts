import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankuComponent } from './thanku.component';

describe('ThankuComponent', () => {
  let component: ThankuComponent;
  let fixture: ComponentFixture<ThankuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThankuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
