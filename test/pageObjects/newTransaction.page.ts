import Page from './page.ts';
import { faker } from '@faker-js/faker';

const activeElements = '.MuiStepLabel-active';
const searchInput = '[data-test="user-list-search-input"]';
const disabledElements = '.Mui-disabled .MuiStepLabel-labelContainer';
const usersList = 'main .MuiListItem-root.MuiListItem-gutters';
const amountField = '#amount';
const addNoteField = '#transaction-create-description-input';
const payBtn = '[data-test="transaction-create-submit-payment"]';
const allSteps = '.MuiStep-root.MuiStep-horizontal';
const returnToTransactionBtn =
  '[data-test="new-transaction-return-to-transactions"]';
const createAnotherTransactionBtn =
  '[data-test="new-transaction-create-another-transaction"]';
const infoText =
  '.MuiGrid-justify-content-xs-center .MuiTypography-gutterBottom';
const userName = 'main .MuiGrid-spacing-xs-4 .MuiTypography-gutterBottom';
const transactionMsg = '.MuiAlert-message';
const requestBtn = '[data-test="transaction-create-submit-request"]';
const selectedUserName = '.MuiListItemText-primary';

class NewTransaction extends Page {
  public get disabledElements() {
    return $$(disabledElements);
  }
  public get transactionMsg() {
    return $(transactionMsg);
  }
  public get requestBtn() {
    return $(requestBtn);
  }
  public get selectedUserName() {
    return $(selectedUserName);
  }
  public get userName() {
    return $(userName);
  }
  public get infoText() {
    return $(infoText);
  }
  public get returnToTransactionBtn() {
    return $(returnToTransactionBtn);
  }
  public get createAnotherTransactionBtn() {
    return $(createAnotherTransactionBtn);
  }
  public get usersList() {
    return $$(usersList);
  }
  public get allSteps() {
    return $$(allSteps);
  }
  public get addNoteField() {
    return $(addNoteField);
  }
  public get payBtn() {
    return $(payBtn);
  }
  public get activeElements() {
    return $$(activeElements);
  }
  public get amountField() {
    return $(amountField);
  }
  public get searchInput() {
    return $(searchInput);
  }
  public async clickPayBtn() {
    await this.payBtn.click();
  }
  public async clickRequestBtn() {
    await this.requestBtn.click();
  }
  public async typeSearchUser(userName: string) {
    const oldLength = (await this.usersList).length;
    await browser.waitUntil(
      async () => {
        await this.searchInput.setValue(userName);
        return (await this.usersList).length != oldLength
      },
      { timeout: 20_000 }
    );
  }
  public async typeAmountField(value?: number) {
    const amountToSet =
      value !== undefined ? value : Math.floor(Math.random() * 999);
    await this.amountField.setValue(amountToSet);
    return amountToSet;
  }
  public async typeAddNoteField() {
    let generatedValue = faker.lorem.paragraph();
    await this.addNoteField.setValue(generatedValue);
    return generatedValue;
  }
  public async selectRandomUser() {
    const list = await this.usersList;
    const userIndex = Math.floor(Math.random() * list.length);
    return await this.selectUser(userIndex);
  }
  private async selectUser(userIndex: number) {
    const selectedElement = (await browser.waitUntil(
      async () => await this.usersList[userIndex],
      {
        timeout: 20_000
      }
    )) as WebdriverIO.Element;
    const name = await selectedElement.$(selectedUserName).getText();
    await selectedElement.click();
    return name;
  }
  public async selectFirstUser() {
    return await this.selectUser(0);
  }
}
export default new NewTransaction();
