import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject();

  constructor(private es: ExerciseService) { }

  start() {
    this.es.randomError().pipe(
      // retry(5)
      catchError(err => {
        console.log('Böser Fehler:', err);

        // return throwError('MEIN FEHLER'); // weiterwerfen
        // return of('Nichts', 'passiert!'); // ersetzen
        // return EMPTY; // verschlucken
        return of({ error: err });
      })
    ).subscribe({
      next: value => this.logStream$.next(value),
      error: err => this.logStream$.next('💥 ERROR: ' + err)
    });
  }
}
