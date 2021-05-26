import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{FacultyComponent} from './faculty/faculty.component'
import{StudentComponent} from './student/student.component'
const routes: Routes = [
{path: 'faculty',component:FacultyComponent},
{path: 'student',component:StudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
