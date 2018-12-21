import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { StudentComponent } from './student/student.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { StudentDataService } from './student-data.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CalculationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [StudentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
