import { Router } from '@angular/router';
import { AdminService } from './../../../Services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){

   this.adminService.logout();

   this.router.navigateByUrl('admin/login')


  }

}
