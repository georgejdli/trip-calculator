import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentComponent } from './student.component';

import { FormsModule } from '@angular/forms';
import { Student } from '../student.model';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ StudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a newStudent student`, async(() => {
    let fixture = TestBed.createComponent(StudentComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.newStudent instanceof Student).toBeTruthy()
  }));
});
