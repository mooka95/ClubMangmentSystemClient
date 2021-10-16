import { MemberImpl } from './../Models/member-impl';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
member:MemberImpl

  constructor() { }

  setMembers(member:MemberImpl) {
    this.member=member;
  }
  getMembers(){
    return this.member;
  }


}
