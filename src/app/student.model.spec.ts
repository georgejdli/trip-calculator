import { TestBed } from '@angular/core/testing';

import { Student } from './student.model';

describe('CalculatorService', () => {
  
    it('should create an instance', () => {
      expect(new Student()).toBeTruthy();
    });

    it('should be able to add expenses', () => {
      let bob = new Student();
      bob.name = 'Bob';
       bob.addExpense({description: 'Uber', amount: 5.75});
       bob.addExpense({description: 'Lyft', amount: 12.79})
       bob.addExpense({description: 'Taxi', amount: 35.00})
       expect(bob.totalExpense).toBe(53.54);
    });
});