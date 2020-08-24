import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { 
  
  }

  getCategories()
  {
    return this.db.list('/categories').snapshotChanges()
    .pipe(map
      (changes=>
        changes.map(c=>
          ({
            key:c.payload.key,
            value:c.payload.val()
          })
          )));
  }
}

// query:
// ~~~~~~
// 17       {
// ~~~~~~~
// 18         orderByChild:'name'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 19       }

