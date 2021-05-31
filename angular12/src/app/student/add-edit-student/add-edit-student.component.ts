import { Component, OnInit, Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

  constructor(private service:SharedService) { }
  @Input() stud:any;

  StudentId:any;
  StudentName:any;
  FacultyName:any;
  DateOfMatriculation:any;
  PhotoFileName:any;
  PhotoFilePath:any;

  FacultyList:any=[];

  ngOnInit(): void {
    this.loadFacultyList();
  }

  loadFacultyList(){
    this.service.getFacultiesName().subscribe((data : any)=>{
      this.FacultyList=data;
      this.StudentId = this.stud.StudentId;
      this.StudentName=this.stud.StudentName;
      this.FacultyName = this.stud.FacultyName;
      this.DateOfMatriculation = this.stud.DateOfMatriculation;
      this.PhotoFileName = this.stud.PhotoFileName;
      this.PhotoFilePath = this.service.Photourl  + this.PhotoFileName;
    });
  }



  addStudent(){
    var val = {StudentId:this.StudentId,
              StudentName:this.StudentName,
              FacultyName:this.FacultyName,
              DateOfMatriculation:this.DateOfMatriculation,
              PhotoFileName:this.PhotoFileName};
    if (!isNaN(parseInt(this.StudentName.charAt(0))) || this.FacultyName==="--Select--")
      alert("Incorrect name or option. Change it.");
    else{
      this.service.addStudent(val).subscribe(data=>{
        alert(data.toString());
      });
    }
  }

  updateStudent(){
    var val = {StudentId:this.StudentId,
      StudentName:this.StudentName,
      FacultyName:this.FacultyName,
      DateOfMatriculation:this.DateOfMatriculation,
      PhotoFileName:this.PhotoFileName};

    if (!isNaN(parseInt(this.StudentName.charAt(0))) || this.FacultyName==="--Select--")
      alert("Incorrect name or option. Change it.");
    else{
      this.service.updateStudent(val).subscribe(data=>{
        alert(data.toString());
      });
    }
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData : FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.uploadPhoto(formData).subscribe((data:any)=>{
      // confirm("Old Photo:" + this.PhotoFilePath.toString());
      this.PhotoFileName = data.toString();
      // confirm("Partea3: " + data.toString());
      this.PhotoFilePath = this.service.Photourl+this.PhotoFileName;
      //  confirm("Partea4: " + this.PhotoFilePath);
    });
    // confirm("Partea 5:" + this.PhotoFilePath);
  }
}
