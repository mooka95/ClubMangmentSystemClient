import { MemberImpl } from './../../../Models/member-impl';
import { SharedService } from './../../../Services/shared.service';
import { AdminService } from './../../../Services/admin.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit ,OnDestroy{
  subscription:Subscription;
  allMembers:MemberImpl[];

  constructor(private adminService:AdminService,private router:Router,private sharedService:SharedService) { }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.adminService.logout();

    this.subscription?.unsubscribe();
    alert(" YOU Will Logged Out ? ")

    
  }

}
