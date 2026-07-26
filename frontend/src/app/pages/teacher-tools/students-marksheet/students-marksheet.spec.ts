import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMarksheet } from './students-marksheet';

describe('StudentsMarksheet', () => {
  let component: StudentsMarksheet;
  let fixture: ComponentFixture<StudentsMarksheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsMarksheet],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsMarksheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
