import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  constructor(private service: SharedService) { }

  StudentList:any=[];
  ModalTitle:any;
  ActivareAddEditStudentComponent:boolean=false;
  student: any;

  ngOnInit(): void {
    this.refreshStudentList();
  }

  addClick(){
      this.student={
        StudentId: 0,
        StudentName: "",
        FacultyName:"",
        DateOfMatriculation:"",
        PhotoFileName:"defaultPhoto.jpg"
      }
      this.ModalTitle="Add student";
      this.ActivareAddEditStudentComponent = true;
  }

  editClick(item:any){
      
      this.student=item;
      // confirm(this.student.PhotoFilePath.toString());
      // confirm(item.toString());
      this.ModalTitle="Edit Student";
      this.ActivareAddEditStudentComponent = true;
  }

  closeClick(){
    this.ActivareAddEditStudentComponent = false;
    this.refreshStudentList();
  }

  deleteClick(item: any){
      if(confirm("Are you ready to delete it?")){
          this.service.deleteStudent(item.StudentId.toString()).subscribe(res=>{
        alert(res.toString());
        this.refreshStudentList();
        });
      }
  }

  refreshStudentList(){
    this.service.getStudentList().subscribe(data => {
      this.StudentList = data;
    });
  }

}
