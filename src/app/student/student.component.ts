import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { StudentDataService } from '../student-data.service';
import { Student } from '../student.model';
import { Expense } from '../expense.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  private studentDataService: StudentDataService;
  private router: Router;

  newStudent: Student = new Student();

  constructor(studentDataService: StudentDataService, router: Router) {
    this.studentDataService = studentDataService;
    this.router = router;
  }

  ngOnInit() {
  }

  addStudent() {
    this.studentDataService.addStudent(this.newStudent);
    this.newStudent = new Student();
  }

  removeStudent(student) {
    this.studentDataService.deleteStudentById(student.id);
  }

  addExpense(student, description, amount) {
    const amountNum = parseFloat(amount);
    const expense: Expense = {
      description: description,
      amount: amountNum
    }
    this.studentDataService.addExpense(student.id, expense);
  }

  maskCurrency(amount) {
    return parseFloat(amount).toFixed(2);
  }

  calculateAmountsOwed() {
    this.studentDataService.calcAmountsOwed();
    //TODO: route to a new page
  }

  get students(): Student[] {
    return this.studentDataService.getAllStudents();
  }

  gotoCalculations() {
    this.calculateAmountsOwed();

    console.log('Before route to new page', this.studentDataService.getAllStudents());

    this.router.navigate(['results']).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
