import { Injectable } from '@angular/core';
import { Student } from './student.model';

import * as BigNumbers from 'big-numbers';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private numbers;
  students: Student[] = [];
  lastId: number = 0;

  constructor() { 
    this.numbers = new BigNumbers({
      precision: 2
    });
  }

  addStudent(student: Student): StudentDataService {
    if (!student.id) {
      student.id = ++this.lastId;
    }
    this.students.push(student);
    return this;
  }

  getStudentById(id: number): Student {
    return this.students
      .filter(student => student.id === id)
      .pop();
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  addExpense(studentId: number, expense: Expense){
    let student = this.getStudentById(studentId);
    student.addExpense(expense);
    return student;
  }

  deleteStudentById(id: number): StudentDataService {
    this.students = this.students
      .filter(student => student.id !== id);
    return this;
  }

  calcAmountsOwed() {

    const equalShare = this.calcEqualShare();

    //find which student is owed money
    const studentOwedMoney = this.students.reduce((prevStudent, currentStudent) => {
      return (prevStudent.totalExpense > currentStudent.totalExpense) ? prevStudent : currentStudent
    });

    this.students.forEach((student) => {
      //clear out any amounts owed if we are recalculating
      student.amountsOwed = [];
      
      if (student.name !== studentOwedMoney.name) {
        const equalShareNumber = this.numbers.of(equalShare);
        const studentExpensesNumber = this.numbers.of(student.totalExpense);
        const owed = this.numbers.format(equalShareNumber.subtract(studentExpensesNumber));
        student.amountsOwed.push({name: studentOwedMoney.name, amount: owed});
      }
    });
    
    return this.students;
  }

  calcEqualShare() {
    // find the split amount among the students and round to the nearest cent
    const equalShareNumber = this.students.reduce((runningTotal, student) => {
      const totalExpenseNumber = this.numbers.of(student.totalExpense);
      return runningTotal.add(totalExpenseNumber);
    }, this.numbers.of(0)).divide(this.numbers.of(3));
    
    return this.numbers.format(equalShareNumber);
  }
}
