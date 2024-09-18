import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsnComponent } from './esn.component';

describe('EsnComponent', () => {
  let component: EsnComponent;
  let fixture: ComponentFixture<EsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
