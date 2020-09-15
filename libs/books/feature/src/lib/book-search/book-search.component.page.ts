import { DebugElement } from '@angular/core';

export class BookSearchComponentPage {
  root: DebugElement = null;

  selectors = {
    inputElement: 'input',
    booksListElement: '.book',
    button: 'button'
  }

  constructor(debugElement) {
    this.root = debugElement;
  }

  getInputElement() {
    return this.root.nativeElement.querySelector(this.selectors.inputElement);
  }

  getBooksListElement() {
    const ele = this.root.nativeElement.querySelector(this.selectors.booksListElement);
    return ele ? ele.nativeElement : null;
  }

  submitButton() {
    return this.root.nativeElement.querySelector(this.selectors.button);
  }
}