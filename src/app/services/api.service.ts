import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  post(data: any) {
    const ref = this.db.list('messages');

    return ref.push(data);
  }

  getAll() {
    const ref = this.db.list('messages');

    return ref.snapshotChanges().pipe(
      map((e) => {
        return e.map((y) => {
          let apidata: any = {};
          apidata = y.payload.toJSON();
          apidata['id'] = y.key;
          return apidata;
        });
      })
    );
  }
}
