import { createAction, props } from '@ngrx/store';
export const addMessageData = createAction('ADD_MESSSAGE_DATA', props<any>());
export const addMessageDataSuccessful = createAction(
  'ADD_MESSSAGE_DATA_SUCCESSFUL',
  props<any>()
);
