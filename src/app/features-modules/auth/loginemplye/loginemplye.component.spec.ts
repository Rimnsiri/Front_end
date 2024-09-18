import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginemplyeComponent } from './loginemplye.component';

describe('LoginComponent', () => {
  let component: LoginemplyeComponent;
  let fixture: ComponentFixture<LoginemplyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginemplyeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginemplyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
