import { Router } from '@angular/router';
import { AdminService } from './../../../Services/admin.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit ,OnDestroy {
  subsciption:Subscription
  addAdminForm:FormGroup;
  message:string;
  error:boolean=false;

  constructor(private adminService:AdminService,private router:Router) { }
  

  ngOnInit(): void {
    this.addAdminForm=new FormGroup({
      'name':new FormControl('',[Validators.required]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(4)])

    })
  }
  onSubmit(){
    this.subsciption=this.adminService.addAdmin(this.addAdminForm.value).subscribe(
     (response)=>{
       console.log(response);
       this.message='Admin Added Succssefully';

     },
     (err)=>{
       this.message=err.error.message;
       this.error=true;
       this.router.navigateByUrl('/admin/login')
   
     }

    )
    this.addAdminForm.reset();

  }
  ngOnDestroy(): void {
    console.log('destroy add admin ')
    this.subsciption?.unsubscribe();
  }

}
