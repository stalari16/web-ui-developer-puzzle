import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  public books: ReadingListBook[];

  public searchForm = this.fb.group({
    term: ''
  });

  private readonly subscriptions = new Subscription();
  private instantSearchSubscription$ = new Subject();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm.get('term').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(term => this.instantSearch(term)),
      takeUntil(this.instantSearchSubscription$)
    ).subscribe();

    this.subscriptions.add(this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    }));
  }

  ngOnDestroy(): void {
    this.instantSearchSubscription$.next();
    this.instantSearchSubscription$.complete();

    this.subscriptions.unsubscribe();
  }

  public formatDate(date: void | string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : '';
  }

  public addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  public searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  public searchBooks(): void {
    this.instantSearch(this.searchForm.value.term);
  }

  private instantSearch(term: string): void {
    if (term) {
      this.store.dispatch(searchBooks({ term }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
