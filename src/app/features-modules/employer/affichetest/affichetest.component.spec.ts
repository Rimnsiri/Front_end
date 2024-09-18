import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichetestComponent } from './affichetest.component';

describe('PrivacyPolicyComponent', () => {
  let component: AffichetestComponent;
  let fixture: ComponentFixture<AffichetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichetestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
