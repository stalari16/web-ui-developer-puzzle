import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  public readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {
  }
}
