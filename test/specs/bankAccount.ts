import loginHelper from '../helpers/loginHelper.ts';
import bankAccountPage from '../pageObjects/bankAccount.page.ts';
import { config } from '../../wdio.conf.ts';
import { faker } from '@faker-js/faker';
import bankAccountHelper from '../helpers/bankAccountHelper.ts';

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

const fakeBankName = faker.finance.accountName();
const fakeRoutingNumber = faker.finance.routingNumber();
const fakeValidAccountNumber = faker.finance.accountNumber(9);
const fakeInvalidAccountNumber = faker.finance.accountNumber(8);

describe('Bank account', () => {
  beforeEach(async () => {
    await loginHelper.login(username, password);
  });

  it('TC_17: Add a bank account', async () => {
    await bankAccountPage.clickBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts`);
    await expect(await bankAccountPage.createBankAccountBtn).toBeDisplayed();
    const text = await bankAccountPage.getBankAccountText();
    await expect(text).toEqual(`Bank Accounts`);
    await bankAccountPage.clickCreateBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts/new`);
    await bankAccountPage.fillBankNameInput(fakeBankName);
    await bankAccountPage.fillroutingNumberInput(fakeRoutingNumber);
    await bankAccountPage.fillaccountNumberInput(fakeValidAccountNumber);
    await bankAccountPage.clickSaveBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts`);
    await expect(
      await bankAccountPage.waitForDeletBtnByBankName(fakeBankName)
    ).toBeDisplayed();
    await expect(await bankAccountPage.createBankAccountBtn).toBeDisplayed();
    const bankNamesList = await bankAccountPage.bankNameList;
    const createdBankName = bankNamesList.some(async (element) => {
      const text = await element.getText();
      return text === fakeBankName;
    });
    await expect(createdBankName).toBe(true);
  });
  it('TC_18: Add a bank account with empty "Bank Name" field', async () => {
    await bankAccountPage.clickBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts`);
    await expect(await bankAccountPage.createBankAccountBtn).toBeDisplayed();
    const text = await bankAccountPage.getBankAccountText();
    await expect(text).toEqual(`Bank Accounts`);
    await bankAccountPage.clickCreateBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts/new`);
    await expect(await bankAccountPage.banknameInput).toHaveValue('');
    await bankAccountPage.fillroutingNumberInput(fakeRoutingNumber);
    await bankAccountPage.fillaccountNumberInput(fakeValidAccountNumber);
    await expect(await bankAccountPage.saveBtn).toHaveElementClass(
      'Mui-disabled'
    );
  });
  it('TC_19: Add a bank account with "Account Number" containing 8 characters', async () => {
    await bankAccountPage.clickBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts`);
    await expect(await bankAccountPage.createBankAccountBtn).toBeDisplayed();
    const text = await bankAccountPage.getBankAccountText();
    await expect(text).toEqual(`Bank Accounts`);
    await bankAccountPage.clickCreateBankAccountBtn();
    await expect(browser).toHaveUrl(`${config.baseUrl}bankaccounts/new`);
    await bankAccountPage.fillBankNameInput(fakeBankName);
    await bankAccountPage.fillroutingNumberInput(fakeRoutingNumber);
    await bankAccountPage.fillaccountNumberInput(fakeInvalidAccountNumber);
    await expect(await bankAccountPage.saveBtn).toHaveElementClass(
      'Mui-disabled'
    );
    const expectedText = await bankAccountPage.bankAccountHelperText.getText();
    await expect(expectedText).toEqual(`Must contain at least 9 digits`);
  });

  it('TC_20: Delete a bank account', async () => {
    const bankName = await bankAccountHelper.createBankAccount();
    await bankAccountPage.deleteBankAccount(bankName);
    const getBankAccountByName =
      await bankAccountPage.getBankAccountTitleByName(`${bankName} (Deleted)`);
    await expect(getBankAccountByName).toBeDisplayed();
  });

  afterEach(async () => {
    await loginHelper.logout();
  });
});
