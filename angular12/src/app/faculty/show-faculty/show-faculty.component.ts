
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';


@Component({
  selector: 'app-show-faculty',
  templateUrl: './show-faculty.component.html',
  styleUrls: ['./show-faculty.component.css']
})
export class ShowFacultyComponent implements OnInit {

  constructor(private service: SharedService) { }

  FacultyList:any=[];
  ModalTitle:any;
  ActivareAddEditFacultyComponent:boolean=false;
  faculty: any;

  FacultyIdFilter:string="";
  FacultyNameFilter:string="";
  FacultyListWithoutFilter:any=[];





  ngOnInit(): void {
    this.refreshFacultyList();
  }

  addClick(){
      this.faculty={
        FacultyId: 0,
        FacultyName: ""
      }
      this.ModalTitle="Add faculty";
      this.ActivareAddEditFacultyComponent = true;
  }

  editClick(item:any){
      this.faculty=item;
      this.ModalTitle="Edit Faculty";
      this.ActivareAddEditFacultyComponent = true;
  }

  closeClick(){
    this.ActivareAddEditFacultyComponent = false;
    this.refreshFacultyList();
  }

  deleteClick(item: any){
      if(confirm("Are you ready to delete it?")){
          this.service.deleteFaculty(item.FacultyId.toString()).subscribe(res=>{
        alert(res.toString());
        this.refreshFacultyList();
        });
      }
  }

  refreshFacultyList(){
    this.service.getFacultyList().subscribe(data => {
      this.FacultyList = data;
      this.FacultyListWithoutFilter = data;
    });
  }

  Filtrare(){
    var FacultyIdFilter = this.FacultyIdFilter;
    var FacultyNameFilter = this.FacultyNameFilter;

    this.FacultyList=this.FacultyListWithoutFilter.filter(function (item:any){
      return item.FacultyId.toString().toLowerCase().includes(FacultyIdFilter.toString().trim().toLowerCase()
      )&&
      item.FacultyName.toString().toLowerCase().includes(FacultyNameFilter.toString().trim().toLowerCase()
      )
    });

  }

  sortResult(prop:any,asc:any){
    this.FacultyList = this.FacultyListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop]) ? 1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop]) ? 1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


}
