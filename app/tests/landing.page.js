import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class LandingPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LANDING}`;
    this.pageSelector = Selector(this.pageId);
    this.carousel = Selector('.landing-carousel');
    this.carouselItems = this.carousel.find('.carousel-item');
    this.footerLink = Selector('.footer #project-webpage');
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }

  async checkCarousel() {
    await t.expect(this.carousel.visible).ok('Landing carousel is visible.');

    const itemsCount = await this.carouselItems.count;
    await t.expect(itemsCount).gt(0, 'Carousel has items.');
  }

  async checkFooterLink() {
    const url = await this.footerLink.getAttribute('href');

    await t.expect(url === 'https://kala-forecast.github.io/').ok('GitHub Page link is correct.');
  }
}

export const landingPage = new LandingPage();
