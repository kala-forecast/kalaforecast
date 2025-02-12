import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class LandingPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LANDING}`;
    this.pageSelector = Selector(this.pageId);
    this.carousel = Selector('.landing-carousel');
    this.footerLink = Selector('.footer #project-webpage');
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async checkFooterLink() {
    const url = await this.footerLink.getAttribute('href');
    await t.expect(url === 'https://kala-forecast.github.io/').ok('GitHub Page link is correct.');
  }
}

export const landingPage = new LandingPage();
