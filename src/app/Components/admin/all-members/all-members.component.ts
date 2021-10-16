
import { Router } from '@angular/router';
import { AddMemberComponent } from './../add-member/add-member.component';
import { MemberImpl } from './../../../Models/member-impl';
import { SharedService } from './../../../Services/shared.service';
import { AdminService } from './../../../Services/admin.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit,OnDestroy{
  allMembers:MemberImpl[];
  subscription:Subscription;
  showDetails: boolean=false;
  cardId:string='';


  constructor(private sharedService:SharedService,private adminService:AdminService,public modalService: NgbModal,private router:Router) { }



  ngOnInit(): void {
  this.adminService.getAllMembers().subscribe(
      (response)=>{
    
       
        this.allMembers=response["members"];
 
      },
      (err)=>{
        this.router.navigateByUrl('admin/login');
       console.log(err);
      }
 
 
 
     )

  }
  deleteMember(memberId:string){
    console.log(memberId)
    let continueDeleting=confirm("Are You Sure You Want To delete Member");
    if(continueDeleting){
      this.adminService.deleteMember(memberId).subscribe(
        (response)=>{ 
          console.log(response);
          this.allMembers=response["members"];

        },
        (err)=>{
          console.log(err);
          this.router.navigateByUrl('/admin/login')
        }
      )
    }
    

  }
  editMember(member:MemberImpl){
 
    this.sharedService.setMembers(member);
   this.router.navigateByUrl('admin/Home/AddMember');

  }


  showMemberDetails(id:string){
    this.cardId=id;
    this.showDetails=!this.showDetails;




  }





  ngOnDestroy(): void {
    console.log('destroy all members ')
   this.subscription?.unsubscribe();
  }


}
