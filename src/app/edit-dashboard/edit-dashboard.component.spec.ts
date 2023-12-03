import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDashboardComponent } from './edit-dashboard.component';

describe('EditDashboardComponent', () => {
  let component: EditDashboardComponent;
  let fixture: ComponentFixture<EditDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDashboardComponent]
    });
    fixture = TestBed.createComponent(EditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
