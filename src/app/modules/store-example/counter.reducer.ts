import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, double, half } from './counter.actions';

export const initialCounter = 0;

export const counterReducer = createReducer(initialCounter,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(double, state => state * 2),
  on(half, state => Math.ceil(state / 2)),
  on(reset, state => 0),
);
