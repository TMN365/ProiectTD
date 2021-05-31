import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-faculty',
  templateUrl: './add-edit-faculty.component.html',
  styleUrls: ['./add-edit-faculty.component.css']
})
export class AddEditFacultyComponent implements OnInit {

  constructor(private service:SharedService) { }
  @Input() fac:any;

  FacultyId:string="";
  FacultyName:string="";

  ngOnInit(): void {
    this.FacultyId=this.fac.FacultyId;
    this.FacultyName=this.fac.FacultyName;

  }

  addFaculty(){
    var val = {FacultyId:this.FacultyId,
                FacultyName:this.FacultyName};
    if (!isNaN(parseInt(this.FacultyName.charAt(0))))
      alert("Incorrect name. Change it.");
    else{
      this.service.addFaculty(val).subscribe(res=>{
        alert(res.toString());
      });
    }
    
  }

  updateFaculty(){
    var val = {FacultyId:this.FacultyId,
      FacultyName:this.FacultyName};
    if (!isNaN(parseInt(this.FacultyName.charAt(0))))
      alert("Incorrect name. Change it.");
    else{    
      this.service.updateFaculty(val).subscribe(res=>{
      alert(res.toString());
      });
    }
  }
}
