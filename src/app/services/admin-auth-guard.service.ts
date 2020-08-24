import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs-compat/add/operator/switchMap';
import {Observable } from 'rxjs';
import {AppUser} from '../model/AppUser';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private userService:UserService, private router:Router) { }

  // canActivate():Observable<Boolean>
  // {
  //  return this.auth.user$
  //     .switchMap(user=>this.userService.get(user.uid))
  //     .map(a=>a.isAdmin)
  // }
x;
  canActivate(route,state:RouterStateSnapshot)
  {
   this.auth.user$
    .map(user=>{
     return this.userService.get(user.uid);
    })
    .subscribe(x=>x.subscribe(a=>
      { 
       this.x= a.isAdmin
      }));
      return this.x;
 }
}
