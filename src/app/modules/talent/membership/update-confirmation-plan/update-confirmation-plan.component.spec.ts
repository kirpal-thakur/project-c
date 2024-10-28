import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfirmationPlanComponent } from './update-confirmation-plan.component';

describe('UpdateConfirmationPlanComponent', () => {
  let component: UpdateConfirmationPlanComponent;
  let fixture: ComponentFixture<UpdateConfirmationPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateConfirmationPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateConfirmationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
