import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  });

  it('Then: I should see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should see snackbar when item is removed from my reading list and then Undo functionality', async () => {
    // Search for books
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    // add book to the list
    const items = await $$('[data-testing="book-item"]');
    const addBookBtn = items[0].element(by.tagName('button'));
    await addBookBtn.click();

    // open my reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    // try removing item from the list
    let listItem = element(by.css('.reading-list-item'));
    let button = listItem.element(by.tagName('button'));
    await button.click();

    //recheck reading list items.
    listItem = element(by.css('.reading-list-item'));
    expect(listItem).not.toBeUndefined();

    // look for snackbar
    const snackBar = element(by.tagName('snack-bar-container'));
    await browser.wait(ExpectedConditions.visibilityOf(snackBar));

    // search for undo button on the snack bar
    const undoBtn = snackBar.element(by.tagName('button'));
    undoBtn.click();

    //recheck reading list items.
    listItem = element(by.css('.reading-list-item'));
    expect(listItem).not.toBeUndefined();

    //clear the list
    button = listItem.element(by.tagName('button'));
    await button.click();
  });
});
