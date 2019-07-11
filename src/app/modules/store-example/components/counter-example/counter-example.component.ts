import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, double, half, increment, reset } from '../../counter.actions';

@Component({
  selector: 'expo-counter-example',
  templateUrl: './counter-example.component.html',
  styleUrls: ['./counter-example.component.scss']
})
export class CounterExampleComponent {
  
  count$: Observable<number>;
 
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }
 
  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  double() {
    this.store.dispatch(double());
  }
 
  half() {
    this.store.dispatch(half());
  }
 
  reset() {
    this.store.dispatch(reset());
  }

}
