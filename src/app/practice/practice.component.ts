import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent  {

  constructor(private af:AngularFireAuth) {

    firebase.auth.GithubAuthProvider_Instance
    firebase.database.name;
    firebase.messaging();

    af.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    firebase
   }


 

}
