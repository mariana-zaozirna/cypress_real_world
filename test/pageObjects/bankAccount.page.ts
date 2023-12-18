import Page from './page.ts';

const bankAccountNavBtn = '[data-test="sidenav-bankaccounts"]';
const banknameInput = '#bankaccount-bankName-input';
const routingNumberInput = '#bankaccount-routingNumber-input';
const accountNumberInput = '#bankaccount-accountNumber-input';
const saveBtn = '[data-test="bankaccount-submit"]';
const createBankAccountBtn = '[data-test="bankaccount-new"]';
const bankAccountText = '//div[@class="MuiGrid-root MuiGrid-item"] //h2';
const deleteBtn = '[data-test="bankaccount-delete"]';
const bankNameList = '//div[@class="MuiGrid-root MuiGrid-item"] //p';
const bankList = 'li.MuiListItem-root';
const bankNameLocator = 'p';
const bankAccountHelperText = '#bankaccount-accountNumber-input-helper-text';

class BankAccount extends Page {
  public get bankAccountHelperText() {
    return $(bankAccountHelperText);
  }
  public get bankAccountNavBtn() {
    return $(bankAccountNavBtn);
  }
  public get bankNameList() {
    return $$(bankNameList);
  }
  public get bankList() {
    return $$(bankList);
  }
  public get bankAccountText() {
    return $(bankAccountText);
  }
  public get createBankAccountBtn() {
    return $(createBankAccountBtn);
  }
  public get banknameInput() {
    return $(banknameInput);
  }
  public get routingNumberInput() {
    return $(routingNumberInput);
  }
  public get accountNumberInput() {
    return $(accountNumberInput);
  }
  public get saveBtn() {
    return $(saveBtn);
  }
  public async clickBankAccountBtn() {
    await this.bankAccountNavBtn.click();
  }
  public async clickSaveBtn() {
    await this.saveBtn.click();
  }
  public async clickCreateBankAccountBtn() {
    await this.createBankAccountBtn.click();
  }
  public async getBankAccountText() {
    return await (await this.bankAccountText).getText();
  }
  public async fillBankNameInput(value: string) {
    await (await this.banknameInput).setValue(value);
  }
  public async fillroutingNumberInput(value: string) {
    await (await this.routingNumberInput).setValue(value);
  }
  public async fillaccountNumberInput(value: string) {
    await (await this.accountNumberInput).setValue(value);
  }
  public async deleteBankAccount(bankName: string) {
    return (await this.waitForDeletBtnByBankName(bankName)).click();
  }
  public async waitForDeletBtnByBankName(bankName: string) {
    return (await browser.waitUntil(
      async () => await this.deleteBtnByBankName(bankName),
      {
        timeout: 20_000
      }
    )) as WebdriverIO.Element;
  }
  private async deleteBtnByBankName(bankName: string) {
    let foundElement;
    console.log('Searching delete button for ' + bankName);
    for (const element of await this.bankList) {
      const text = await element.$(bankNameLocator).getText();

      console.log('Checking bank ' + text);
      if (text === bankName) {
        foundElement = element;
        break;
      }
    }
    if (foundElement == undefined) {
      return;
    } else {
      const matchingElement = foundElement as WebdriverIO.Element;
      return await matchingElement.$(deleteBtn);
    }
  }
  public async getBankAccountTitleByName(bankName: string) {
    let foundElement;
    for (const element of await this.bankNameList) {
      const text = await element.getText();
      if (text === bankName) {
        foundElement = element;
        break;
      }
    }
    return foundElement as WebdriverIO.Element;
  }
}

export default new BankAccount();
