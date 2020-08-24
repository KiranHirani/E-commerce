import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor
    (
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private userService: UserService
    ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$() {
    return this.user$
      .map(user => {
        if (user)
          return this.userService.get(user.uid);

        return Observable.of(null);
        //retuning an observable of null value if usser doesn't exist 
      })
    // .map(user=>this.userService.get(user.uid));
  }
}
