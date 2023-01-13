import { createReducer, on } from '@ngrx/store';
import { addMessageDataSuccessful } from './messageAction';

export const initialState = [];
export const loderinitialState = false;

export const messageReducer = createReducer(
  initialState,
  on(addMessageDataSuccessful, (entries, product) => {
    const entriesClone: any = JSON.parse(JSON.stringify(entries));
    entriesClone.push(product);
    return entriesClone;
  })
);

