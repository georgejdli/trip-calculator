import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CalculationsComponent } from './calculations/calculations.component';

const routes: Routes = [
  { path: "students", component: StudentComponent },
  { path: "results", component: CalculationsComponent },
  { path: "", redirectTo: "/students", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
