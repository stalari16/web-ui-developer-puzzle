import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { removeFromReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Remove from Reading List', () => {
    let readinglist: any;
    let dispatchSpy: any;
    let listItem: any;
    let button: any;

    beforeEach(inject([Store], (store: Store) => {
      dispatchSpy = spyOn(store, 'dispatch');
      readinglist = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      component.readingList$ = of(readinglist);
      fixture.detectChanges();

      listItem = fixture.debugElement.queryAll(By.css('.reading-list-item'))[0];
      button = listItem.query(By.css('button')).nativeElement;
      button.click();
    }));

    it('should dispatch removeFromReadingList action', () => {
      expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item: readinglist[0] }));
    });

    it('should open snackbar when item is removed from the list', () => {
      const snackBarElement = document.querySelector('snack-bar-container');
      expect(snackBarElement).toBeTruthy();
    });

    it('should dispatch undoRemoveFromReadingList action on Undo snackbar action button click', ()=> {
      const undoBtn = document.querySelector('div.mat-simple-snackbar-action button');
      const mouseEvent = new MouseEvent('click');
      undoBtn.dispatchEvent(mouseEvent);
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(undoRemoveFromReadingList({ item: readinglist[0] }));
    });
  });
});
