import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLogin } from './management-login';

describe('ManagementLogin', () => {
  let component: ManagementLogin;
  let fixture: ComponentFixture<ManagementLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
