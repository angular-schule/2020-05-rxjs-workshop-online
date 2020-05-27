import { Component, OnInit } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, mergeMap, delay } from 'rxjs/operators';
import { Book } from './book';

@Component({
  selector: 'rxw-typeahead',
  templateUrl: './typeahead.component.html',
})
export class TypeaheadComponent implements OnInit {

  searchControl: FormControl;
  results: Book[];
  loading = false;

  constructor(private ts: TypeaheadService) { }

  ngOnInit() {
    this.searchControl = new FormControl('');
    const searchInput$ = this.searchControl.valueChanges;

    /******************************/

    searchInput$.pipe(
      debounceTime(200),
      filter(term => term.length >= 3),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => this.ts.search(term).pipe(delay(1000))),
      tap(() => this.loading = false),
    ).subscribe(books => this.results = books);

    /*
    - Suchbegriff mindestens 3 Zeichen lang
    - Datenstrom begrenzen, so dass nicht zu viele Events abgeschickt werden
    - niemals zwei gleiche Begriffe nacheinander suchen
    - Suchbegriff zum Server schicken this.ts.search(term)
    - Bücher anzeigen: this.results
    - Extra: Ladeanzeige this.loading
    */

    /******************************/
  }

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

}
