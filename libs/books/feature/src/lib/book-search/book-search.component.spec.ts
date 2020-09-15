import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { addToReadingList, undoAddToReadingList } from '@tmo/books/data-access';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('Want to Read', () => {
    let booksList: any;
    let dispatchSpy: any;
    let bookItem: any;
    let button: any;

    beforeEach(inject([Store], (store: Store) => {
      dispatchSpy = spyOn(store, 'dispatch');
      booksList = [
        createBook('A'),
        createBook('AB'),
        createBook('ABC')
      ];
      component.searchForm.controls.term.setValue('A');
      component.books = booksList;
      fixture.detectChanges();

      bookItem = fixture.debugElement.queryAll(By.css('.book'))[0];
      button = bookItem.query(By.css('button')).nativeElement;
      button.click();
    }));

    it('should dispatch addToReadingList action', () => {
      expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book: booksList[0] }));
    });

    it('should open snackbar when item is added to the list', () => {
      const snackBarElement = document.querySelector('snack-bar-container');
      expect(snackBarElement).toBeTruthy();
    });

    it('should dispatch undoAddToReadingList action on Undo snackbar action button click', () => {
      const undoBtn = document.querySelector('div.mat-simple-snackbar-action button');
      const mouseEvent = new MouseEvent('click');
      undoBtn.dispatchEvent(mouseEvent);
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(undoAddToReadingList({ book: booksList[0] }));
    });
  });
});
