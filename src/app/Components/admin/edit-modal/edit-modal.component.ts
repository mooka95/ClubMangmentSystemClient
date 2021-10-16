import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit , OnDestroy{

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
      'birthDate':new FormControl(
        // this.sharedService.getMembers()?.birthDate
        this.datePipe.transform(this.sharedService.getMembers()?.birthDate, 'yyyy-MM-dd')
        ,[Validators.required])

    });
    
  
  }


  onSubmit(){

    this.addMemberForm.value.enteranceDate=  Date.now();  
    this.sharedService.setMembers(null) ;
    console.log(  this.addMemberForm.value.dateOfBirth)
      // this.subscription= this.adminService.addMember(this.addMemberForm.value).subscribe(

      //  (response)=>{
      //   this.message='Admin Added Succssefully';
      //    console.log(response);

      //  },
      //  (err)=>{
      //        this.message=err.error.message;
      //  this.error=true;
      //    console.log(err)

      //  }



      // );

    this.addMemberForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
