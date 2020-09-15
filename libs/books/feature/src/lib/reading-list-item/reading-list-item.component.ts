import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { finishedFromReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list-item',
  templateUrl: './reading-list-item.component.html',
  styleUrls: ['./reading-list-item.component.scss']
})

export class ReadingListItemComponent {
  @Input() book: ReadingListItem;
  
  constructor(private readonly store: Store){
  }

  public markAsFinished(item: ReadingListItem): void {
    this.store.dispatch(finishedFromReadingList({ item, finishedDate:  new Date().toISOString() }));
  }

  public removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
