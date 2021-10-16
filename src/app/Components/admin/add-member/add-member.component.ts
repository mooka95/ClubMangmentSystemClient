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
      'name':new FormControl(this.sharedService.getMembers()?.name,[Validators.required]),
      'email':new FormControl(this.sharedService.getMembers()?.email,[Validators.required,Validators.email]),
      'address':new FormControl(this.sharedService.getMembers()?.address,[Validators.required]),
      'birthDate':new FormControl( this.datePipe.transform(this.sharedService.getMembers()?.birthDate, 'yyyy-MM-dd'),[Validators.required])

    });
    
  
  }


  onSubmit(){

    this.addMemberForm.value.enteranceDate=  Date.now();  
    if(this.sharedService.getMembers()){

      this.addMemberForm.value._id=this.sharedService.getMembers()._id;
      this.subscription=this.adminService.updatemember(this.addMemberForm.value).subscribe(
        (response)=>{
          console.log(response);
          this.message='Admin Updated Succssefully';
    
        },
        (err)=>{
          this.message=err.error.message;
          this.error=true;
          console.log(err)
        }
      )
      this.sharedService.setMembers(null) ;
      




    }
    else{
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
    }
  
    

    this.addMemberForm.reset();
  }

  ngOnDestroy(): void {
    this.sharedService.setMembers(null) ;
    this.subscription?.unsubscribe();
  }

}
