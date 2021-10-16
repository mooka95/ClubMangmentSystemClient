import { AdminService } from './../../../Services/admin.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit ,OnDestroy {
  subsciption:Subscription
  adminLogin:FormGroup;
  message:string;

  constructor(private adminService:AdminService,private router:Router) { }


  ngOnInit(): void {
    this.adminLogin=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(4)])

    })
  }

  onSubmit(){
  this.subsciption=this.adminService.adminLogin(this.adminLogin.value).subscribe(
     (response)=>{
      if(response['admin'].token){
        localStorage.setItem('token',response['admin'].token);
        this.router.navigateByUrl('/admin/Home');
       }
    
     },
     (err)=>{
       this.message=err.error.message;
       console.log(err.error.message)
     }



  )
  this.adminLogin.reset();

  }

  ngOnDestroy(): void {
    if(this.subsciption)
    this.subsciption.unsubscribe();

  }

}
