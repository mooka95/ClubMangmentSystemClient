import { AuthnticationGuard } from './../../Services/authntication.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {path:'login',component:AdminLoginComponent},
  {path:'Home',component:AdminHomeComponent,canActivate:[AuthnticationGuard],children:[

    {path:'AddMember',component:AddMemberComponent},
    {path:'AddAdmin',component:AddAdminComponent},
    {path:'AllMembers',component:AllMembersComponent},
    {path:'',redirectTo:'AllMembers',pathMatch:'full'}

  ]},
  {path:'',redirectTo:'login', pathMatch: 'full' },
 
];

@NgModule({
  declarations: [
    AdminLoginComponent,
    CardComponent,
    AdminHomeComponent,
    SideBarComponent,
    AddMemberComponent,
    AddAdminComponent,
    AllMembersComponent,
    EditModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe],
})
export class AdminModule { }
