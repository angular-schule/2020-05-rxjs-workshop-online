import { Component, OnInit } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent implements OnInit {

  logStream$ = new ReplaySubject<number | string>();

  ngOnInit() {
    /**
     * Erstelle ein Observable und abonniere den Datenstrom.
     * Probiere dazu die verschiedenen Creation Functions aus: of, from, timer, interval
     * Implementiere außerdem ein Observable manuell, indem du den Konstruktor new Observabe() nutzt.
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */


    // Funktion, die Werte produziert
    function producer(obs) {
      obs.next(1);
      obs.next(2);

      setTimeout(() => obs.next(3), 2000);
      setTimeout(() => obs.complete(), 3000);
      setTimeout(() => obs.next(2), 4000);
    }

    // Observer: hört zu und abonniert den Strom
    const observer = {
      next: e => this.log(e),
      error: err => console.error(err),
      complete: () => console.log('Fertig.')
    };

    // producer(observer);

    // Observable: verpackt den Producer
    // ist das Objekt, das den Datenstrom an den Observer ausgibt
    const myObs$ = new Observable(producer);

    // Strom abonnieren: Observer an das Observable übergeben
    // myObs$.subscribe(observer);
    // myObs$.subscribe(e => console.log(e));

    // const names = ['Leonard', 'Koryna', 'Darmin', 'Lukas', 'Ferdinand'];
    // from(names)
    // timer(1000, 500)
    interval(1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe(e => this.log(e));


    /*****************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
