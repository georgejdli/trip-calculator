import { TestBed } from '@angular/core/testing';

import { StudentDataService } from './student-data.service';
import { Student } from './student.model';
import { Expense } from './expense.model';

describe('StudentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentDataService = TestBed.get(StudentDataService);
    expect(service).toBeTruthy();
  });

  it(`should have method 'calcAmountsOwed'`, () => {
    const service: StudentDataService = TestBed.get(StudentDataService);
    expect(service.calcAmountsOwed).toBeDefined();
  });

  describe('#getAllStudents()', () => {
    it('should return an empty list be default', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      expect(service.getAllStudents()).toEqual([]);
    });

    it('should return all students', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      let student1 = new Student();
      student1.name = 'Test1';
      let student2 = new Student();
      student2.name = 'Test2';
      service.addStudent(student1);
      service.addStudent(student2);

      expect(service.getAllStudents()).toEqual([student1, student2]);
    });
  });

  describe('#addStudent(student)', () => {
    it('should assign incrementing id', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      let student1 = new Student();
      student1.name = 'Test1';
      let student2 = new Student();
      student2.name = 'Test2';

      service.addStudent(student1); //id=1
      service.addStudent(student2); //id=2

      expect(service.getStudentById(1)).toBe(student1);
      expect(service.getStudentById(2)).toBe(student2);

    });
  });

  describe('#addExpense(id, expense)', () => {
    it('should return corresponding student with added expense', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      let student = new Student();
      student.name = 'Test1';
      service.addStudent(student);
      const expense: Expense = {description: 'Expense 1', amount: 1.23}
      let updatedStudent = service.addExpense(1, expense);
      expect(updatedStudent.expenses).toEqual([expense]);
      expect(service.getStudentById(1).expenses).toEqual([expense]);
    });
  });

  describe('#deleteStudentById(id)', () => {
    it('should delete student with corresponding id', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      let student1 = new Student();
      service.addStudent(student1);
      let student2 = new Student();
      service.addStudent(student2);
      service.deleteStudentById(1);
      expect(service.getAllStudents()).toEqual([student2]);
    });
  });

  describe('#calcEqualShare()', () => {
    let louis: Student;
    let carter: Student;
    let david: Student;

    beforeEach(() => {
      
      louis = new Student()
      louis.name = 'Louis';
      louis.addExpense({
        description: 'Expense 1', 
        amount: 5.75
      });
      louis.addExpense({
        description: 'Expense 2', 
        amount: 12.79
      });
      louis.addExpense({
        description: 'Expense 3', 
        amount: 35.00
      });

      carter = new Student();
      carter.name = 'Carter';
      carter.addExpense({
        description: 'Expense 1', 
        amount: 12.00
      });
      carter.addExpense({
        description: 'Expense 2', 
        amount: 15.00
      });
      carter.addExpense({
        description: 'Expense 3', 
        amount: 23.23
      });

      david = new Student();
      david.name = 'David';
      david.addExpense({
        description: 'Expense 1', 
        amount: 10.00
      });
      david.addExpense({
        description: 'Expense 2', 
        amount: 20.00
      });
      david.addExpense({
        description: 'Expense 3', 
        amount: 38.41
      });
      david.addExpense({
        description: 'Expense 4', 
        amount: 45.00
      });
    });

    it('should be able to calculate the correct amount', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      service.addStudent(louis);
      service.addStudent(carter);
      service.addStudent(david);
      let actual = service.calcEqualShare()
      expect(actual).toEqual('72.39');
    });
  });

  describe('#calcAmountsOwed()', () => {
    let louis: Student;
    let carter: Student;
    let david: Student;
    //const service: StudentDataService = TestBed.get(StudentDataService);

    beforeEach(() => {
      
      louis = new Student();
      louis.name = 'Louis';
      louis.addExpense({
        description: 'Expense 1', 
        amount: 5.75
      });
      louis.addExpense({
        description: 'Expense 2', 
        amount: 12.79
      });
      louis.addExpense({
        description: 'Expense 3', 
        amount: 35.00
      });

      carter = new Student();
      carter.name = 'Carter';
      carter.addExpense({
        description: 'Expense 1', 
        amount: 12.00
      });
      carter.addExpense({
        description: 'Expense 2', 
        amount: 15.00
      });
      carter.addExpense({
        description: 'Expense 3', 
        amount: 23.23
      });

      david = new Student();
      david.name = 'David';
      david.addExpense({
        description: 'Expense 1', 
        amount: 10.00
      });
      david.addExpense({
        description: 'Expense 2', 
        amount: 20.00
      });
      david.addExpense({
        description: 'Expense 3', 
        amount: 38.41
      });
      david.addExpense({
        description: 'Expense 4', 
        amount: 45.00
      });
    });

    it('should return the student references', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      service.addStudent(louis);
      service.addStudent(carter);
      service.addStudent(david);
      let actual = service.calcAmountsOwed()
      expect(actual[0].name).toEqual('Louis');
      expect(actual[1].name).toEqual('Carter');
      expect(actual[2].name).toEqual('David');
    });

    it('should calculate the correct amounts owed to other students', () => {
      const service: StudentDataService = TestBed.get(StudentDataService);
      service.addStudent(louis);
      service.addStudent(carter);
      service.addStudent(david);
      let actual = service.calcAmountsOwed()

      expect(actual[0].amountsOwed[0]).toEqual({name: 'David', amount: '18.85'});
      expect(actual[1].amountsOwed[0]).toEqual({name: 'David', amount: '22.16'});
      expect(actual[2].amountsOwed).toEqual([]);
    });
  });
});
