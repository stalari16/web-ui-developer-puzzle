import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  public readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  public removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
    // Note: No input was given on how long the snackbar should display. 
    // So, to accomodate screenreader users (Accessibility), duration param was not added for the snackbar.
    const snackBarRef = this.snackBar.open(`${item.title} removed from your reading list.`, 'Undo');
    snackBarRef.onAction().pipe(take(1)).subscribe(() => this.store.dispatch(undoRemoveFromReadingList({ item })));
  }
}
