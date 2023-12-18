import { $ } from '@wdio/globals';
import Page from './page.ts';

const commentInput = 'form input';
const likeButton =
  '//button[starts-with(@data-test, "transaction-like-button")]';
const commentsSection = '[data-test="comments-list"]';

class DetailsPage extends Page {
  public get commentInput() {
    return $(commentInput);
  }
  public async setComment(comment: string) {
    await this.commentInput.setValue(comment);
    await browser.keys('Enter');
  }
  public get likeButton() {
    return $(likeButton);
  }
  public get commentsSection() {
    return $(commentsSection);
  }
  public async likeTransaction() {
    await (await this.likeButton).click();
  }
}

export default new DetailsPage();
