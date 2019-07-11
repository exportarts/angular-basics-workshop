import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const double = createAction('[Counter Component] Double');
export const half = createAction('[Counter Component] Half');
export const reset = createAction('[Counter Component] Reset');
