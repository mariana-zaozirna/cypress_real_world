import Page from './page.ts';

const paidInfoText = 'p.MuiTypography-body1';
const noteText = 'p.MuiTypography-body2';
const amount = '//span[starts-with(@data-test, "transaction-amount")]';
const mineTab = '[data-test="nav-personal-tab"]';
const emptyList = '[data-test="empty-list-header"]';
const createTransactionBtn =
  '[data-test="transaction-list-empty-create-transaction-button"]';

class Personal extends Page {
  public get paidInfoText() {
    return $$(paidInfoText);
  }
  public get mineTab() {
    return $(mineTab);
  }
  public get emptyList() {
    return $(emptyList);
  }
  public get createTransactionBtn() {
    return $(createTransactionBtn);
  }
  public get amount() {
    return $$(amount);
  }
  public get noteText() {
    return $$(noteText);
  }
  public async waitForTransactionToAppear() {
    await (await $(paidInfoText)).waitForExist({ timeout: 5000 });
  }
  public async clickMineTab() {
    await this.mineTab.click();
  }
  public async open() {
    return super.open('personal');
  }
}
export default new Personal();
