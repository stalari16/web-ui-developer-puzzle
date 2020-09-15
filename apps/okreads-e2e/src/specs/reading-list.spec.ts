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

  it('Then: I should beable to mark the book as finished reading from the list', async () => {
    // Search for books
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('Java');
    await form.submit();

    // add book to the list
    const items = await $$('[data-testing="book-item"]');
    const addBookBtn = items[0].element(by.tagName('button'));
    await addBookBtn.click();

    // open my reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    // Finish reading
    const listItem = element(by.css('.reading-list-item'));
    const button = listItem.element(by.partialButtonText('check_box'));
    await button.click();

    const finishedLabels = element.all(by.css('.reading-list-item--details--finished'));
    expect((await finishedLabels).length).toBeGreaterThan(0);

    //clear the list
    await element.all(by.partialButtonText('remove_circle')).each(btn => {
      btn.click();
    });
    
  });

});
