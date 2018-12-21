import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { StudentDataService } from '../student-data.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  private studentDataService: StudentDataService;
  private router: Router;

  constructor(studentDataService: StudentDataService, router: Router) {
    this.studentDataService = studentDataService;
    this.router = router;
  }

  ngOnInit() {
  }

  get students(): Student[] {
    return this.studentDataService.getAllStudents();
  }

  gotoStudents() {
    this.router.navigate(['students']).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
