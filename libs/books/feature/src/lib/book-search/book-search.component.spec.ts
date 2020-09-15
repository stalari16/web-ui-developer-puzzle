import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { BookSearchComponentPage } from './book-search.component.page';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let componentPage: BookSearchComponentPage;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BooksFeatureModule,
        NoopAnimationsModule,
        SharedTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    componentPage = new BookSearchComponentPage(fixture.debugElement);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get results as we type', () => {
    const inputTerm = componentPage.getInputElement();
    inputTerm.value = 'ja'; 
    inputTerm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(componentPage.getBooksListElement()).not.toBeNull();
      expect(componentPage.getBooksListElement().length).toBeGreaterThan(1);
    });

    inputTerm.value = ''; 
    inputTerm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(componentPage.getBooksListElement()).toBeNull();
    });
  });
});
