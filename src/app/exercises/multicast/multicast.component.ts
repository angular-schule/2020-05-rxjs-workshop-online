import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, ConnectableObservable, timer, interval } from 'rxjs';
import { share, publish, refCount } from 'rxjs/operators';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnInit {

  listeners = [];
  logStream$ = new ReplaySubject();

  measureValues$: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) { }

  ngOnInit() {
    /*******************************/

    this.measureValues$ = new ReplaySubject(5);
    // interval(3000).subscribe(this.measureValues$);
    this.mvs.getValues().subscribe(this.measureValues$);

    // Caching mit shareReplay()
    // const books$ = this.http.get('/books').pipe(shareReplay(1));

    /*
    this.measureValues$ = this.mvs.getValues().pipe(
      publish(),
    ) as ConnectableObservable<number>;

    setTimeout(() => {
      this.measureValues$.connect();
    }, 3000);
    */

    /*******************************/
  }

  addListener() {
    this.listeners.push(this.es.generateRandomString(5));
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString(5);
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
