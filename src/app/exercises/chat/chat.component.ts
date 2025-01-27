import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, merge, concat, race, forkJoin, combineLatest, zip, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxw-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  msg = {
    julia$: new Subject<string>(),
    georg$: new Subject<string>(),
    john$: new Subject<string>()
  };

  logStream$ = new ReplaySubject<string>();

  ngOnInit() {

    /******************************/
    /**
     * Führe die Nachrichten aller Teilnehmer in einem Datenstrom zusammen.
     * Abonniere den Datenstrom und gib die Nachrichten mit der Methode this.log() aus.
     * - merge (Turn multiple observables into a single observable.)
     * - concat (Emit values from source 1, when complete, subscribe to source 2...)
     * - race (The observable to emit first is used.)
     * - forkJoin (When all observables complete, emit the last emitted value from each.)
     * - combineLatest
     * - zip
     */

    merge(
      this.msg.julia$.pipe(map(msg => 'JULIA: ' + msg)),
      this.msg.georg$.pipe(map(msg => 'GEORG: ' + msg)),
      this.msg.john$.pipe(map(msg => 'JOHN: ' + msg))
    ).subscribe({
      next: msg => this.log(msg),
      complete: () => this.log('Alle Teilnehmer weg.'),
    });


    // Exkurs: eigener Operator
    function myStartWith(...initialValues: string[]) {
      return function(source$: Observable<any>): Observable<any> {
        return concat(initialValues, source$);
      };
    }

    of('A', 'B', 'C').pipe(
      myStartWith('Z', 'X', 'Y')
    ).subscribe(console.log);


    /******************************/
  }

  private log(msg: any) {
    this.logStream$.next(msg.toString());
  }
}
