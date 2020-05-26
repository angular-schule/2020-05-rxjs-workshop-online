import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent implements OnInit {

  logStream$ = new ReplaySubject();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore: number;

  ngOnInit() {

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => this.currentScore = score);

    this.score$.pipe(
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => this.finalScore = score);

    of(
      { name: 'Klaus' },
      { city: 'Leipzig' },
      { city: 'Heidelberg' },
      { name: 'Johannes', city: 'Erfurt', age: 30 },
      { foo: 'bar' }
    ).pipe(
      scan((acc, item) => ({ ...acc, ...item }), {})
    ).subscribe(console.log);

    /******************************/

    this.score$.subscribe({
      next: value => this.logStream$.next(value),
      complete: () => this.logStream$.next('❌ COMPLETED')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
