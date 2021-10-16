import { SharedService } from './../../../Services/shared.service';
import { AdminService } from './../../../Services/admin.service';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit ,OnDestroy {
  addMemberForm:FormGroup;
  subscription:Subscription;
  message:string;
  error:boolean=false;
  
  constructor(private adminService:AdminService,private sharedService:SharedService,private datePipe: DatePipe) { 

  }


  ngOnInit(): void {
    this.addMemberForm=new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'address':new FormControl('',[Validators.required]),
      'birthDate':new FormControl('',[Validators.required])

    });
    
  
  }


  onSubmit(){

    this.addMemberForm.value.enteranceDate=  Date.now();  
    this.sharedService.setMembers(null) ;
    console.log(  this.addMemberForm.value.dateOfBirth)
      this.subscription= this.adminService.addMember(this.addMemberForm.value).subscribe(

       (response)=>{
        this.message='Admin Added Succssefully';
         console.log(response);

       },
       (err)=>{
             this.message=err.error.message;
       this.error=true;
         console.log(err)

       }



      );

    this.addMemberForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
