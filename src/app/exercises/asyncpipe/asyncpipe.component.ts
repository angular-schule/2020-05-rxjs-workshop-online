import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { tap, scan } from 'rxjs/operators';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './asyncpipe.component.html',
  styleUrls: ['./asyncpipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncpipeComponent implements OnInit {

  result: number;
  result$: Observable<number>;

  ngOnInit() {
    this.result$ = timer(3000, 700).pipe(
      scan((acc, item) => acc + item, 0),
      tap({
        next: e => console.log(e),
        complete: () => console.log('Complete')
      })
    );
  }

}
