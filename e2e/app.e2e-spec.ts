import { IreportAdminUIPage } from './app.po';

describe('ireport-admin-ui App', function() {
  let page: IreportAdminUIPage;

  beforeEach(() => {
    page = new IreportAdminUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
