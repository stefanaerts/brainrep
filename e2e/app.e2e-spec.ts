import { TestHashPage } from './app.po';

describe('test-hash App', function() {
  let page: TestHashPage;

  beforeEach(() => {
    page = new TestHashPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
