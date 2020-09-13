
## Code Smells

1. In most of `class` files, access specifiers are missing for class members, it's a good coding practice is to have access specifiers for all class members even though the members are `public` by default.
2. In `/libs/books/data-access/src/lib/+state/books.effects.spec.ts`, the describe text should say `searchBooks$` instead of `loadBooks$`.
3. In `book-search.component`, The subscriptions in component should store in a variable and then `unsubscribe` on `ngOnDestroy` callback function.
4. In `book-search.component.ts`, the `formatDate` function should return empty string or some meaningful text like "NA" or just an empty value instead of `undefined` in case of invalid date value becuase the UI will show `undefined` text to the end user which is not appropraite. We can also use `date` pipe directly in the template instead of formatDate().
5. In `book-search.component.ts` and `reading-list.component.ts` the methods should have return types, if nothing is returning then method should declare with `void` return type. 
6. In `readling-list-reducer.spec.ts`, the `describe` statements should be "Reading List Reducer" and "valid Reading List actions" instead of "Books Reducer" and "valid Books actions" resp.
7. `alt` attribute missing for `img` elements in `reading-list` and `book-search` components.

## Improvements

1. I see in `package.json` we are using Angular 10 but the NgRx modules is still on `v9`. We can upgrade it to `v10`. Similarly `@angular/cdk`, `@angular/material`, `rxjs` and other modules can be updated to their respective latest versions.
2. There is a scope to add more test coverage for `book-search.component.ts` and `reading-list.component.ts`.
3. Couple of specs are failing in `reading-list.reducer.spec.ts`
    -> Reading List Reducer › valid reading list actions › failedAddToReadingList should undo book addition to the state
    -> Reading List Reducer › valid reading list actions › failedRemoveFromReadingList should undo book removal from the state

## Accessibility check

### Lighthouse Extension:
1. **Names and Labels**
 - **Buttons do not have an accessible name**
    Failing Elements -> `button.mat-focus-indicator.mat-icon-button.mat-button-base.ng-tns-c71-1`
     Fix: added `aria-label` to all buttons - Search, Reading List, Close Reading List and Remove from Reading list
2. **Contrast**
 - **Background and foreground colors do not have a sufficient contrast ratio.**
    Low-contrast text is difficult or impossible for many users to read
    Failing Elements
        -> `span.mat-button-wrapper` - Reading List nav button on top-right corner
        Fix: using the `$pink-accent: #e20074` instead of `#ff4081`
        -> `p` - `<p>` tag in empty area.
        Fix: using font `color: $gray60` instead of `$gray40`

3. **Image elements do not have [alt] attributes**
    Failing Elements -> img.reading-list-item--cover
    Fix: added `alt` attribute with book title.
### Manual check
1. Interactive elements indicate their purpose and state
    -> **Want to Read** button, in search results page, does not change its appearance when focused on tab
2. HTML5 landmark elements are used to improve navigation
    -> No `footer` landmark element on the UI