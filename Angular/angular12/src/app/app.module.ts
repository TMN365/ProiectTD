import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ShowFacultyComponent } from './faculty/show-faculty/show-faculty.component';
import { AddEditFacultyComponent } from './faculty/add-edit-faculty/add-edit-faculty.component';
import { ShowStudentComponent } from './student/show-student/show-student.component';
import { AddEditStudentComponent } from './student/add-edit-student/add-edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    FacultyComponent,
    ShowFacultyComponent,
    AddEditFacultyComponent,
    ShowStudentComponent,
    AddEditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
