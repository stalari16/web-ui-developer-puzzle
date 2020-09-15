import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListItemComponent } from './reading-list-item.component';
import { BooksFeatureModule } from '@tmo/books/feature';

describe('ReadingListItemComponent', () => {
  let component: ReadingListItemComponent;
  let fixture: ComponentFixture<ReadingListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListItemComponent);
    component = fixture.componentInstance;
    component.book = createReadingListItem('A');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
