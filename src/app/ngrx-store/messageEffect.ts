import { mergeMap } from 'rxjs/operators';
import {
  addMessageData,
  addMessageDataSuccessful,
} from './messageAction';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';


@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  addPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(addMessageData),
      ofType(addMessageData),
      mergeMap((action) => {
        let payload: any = {
          name: action.name,
          message: action.message,
        };
        
        return this.apiService
          .post(payload)
          .then((data) => {
            
            payload['id'] = data.key;
            return addMessageDataSuccessful(payload) ;
          })
          .catch((e) => {
            return addMessageDataSuccessful(e);
          });
      }),
    );
  });
 
}
