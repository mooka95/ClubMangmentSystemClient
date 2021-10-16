import { MemberImpl } from './../Models/member-impl';
import { environment } from './../../environments/environment';
import { AdminImpl } from './../Models/admin-impl';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient) { }
   adminLogin(admin:AdminImpl):Observable<AdminImpl>{
     return this.http.post<AdminImpl>(`${environment.API_URL}/admin/login`,admin);
   }


   addAdmin(admin:AdminImpl):Observable<AdminImpl>{

    return this.http.post<AdminImpl>(`${environment.API_URL}/admin/signup`,admin);

   }
   addMember(member:MemberImpl):Observable<MemberImpl>{
     return this.http.post<MemberImpl>(`${environment.API_URL}/member`,member);

   }
   getAllMembers():Observable<MemberImpl[]>{
     return this.http.get<MemberImpl[]>(`${environment.API_URL}/member`);
   }
    deleteMember(id:string):Observable<string>{
        return this.http.delete<string>(`${environment.API_URL}/member/${id}`)

    }
   isLoggedIn():boolean{
     if(localStorage.getItem('token'))
     return true;
     else
       return false;
   }

   logout(){
    localStorage.removeItem('token');
   }


}
