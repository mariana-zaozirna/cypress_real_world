import { config } from '../../wdio.conf.ts';
import homePage from '../pageObjects/home.page.ts';
import newTransaction from '../pageObjects/newTransaction.page.ts';
import personalPage from '../pageObjects/personal.page.ts';
import newTransactionPage from '../pageObjects/newTransaction.page.ts';
import accountHelper from '../helpers/accountHelper.ts';
import loginHelper from '../helpers/loginHelper.ts';
import { faker } from '@faker-js/faker';

const amount = Number(faker.finance.amount({ dec: 0 }));

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

describe('Transaction feed', () => {
  before(async () => {
    await loginHelper.login(username, password);
  });

  it('TC_9: [Send Payment] New transaction creation', async () => {
    await homePage.clickAccountSideNav();
    const account = await accountHelper.getUserName();
    await homePage.clickNewTransactionBtn();

    await expect(browser).toHaveUrl(`${config.baseUrl}transaction/new`);
    await expect(await newTransaction.searchInput).toBeDisplayed();
    await expect(await newTransaction.activeElements).toHaveLength(1);
    await expect(await newTransaction.activeElements[0]).toHaveText(
      'Select Contact'
    );
    await expect(await newTransaction.disabledElements).toHaveLength(2);
    await expect(await newTransaction.disabledElements[0]).toHaveText(
      'Payment'
    );
    await expect(await newTransaction.disabledElements[1]).toHaveText(
      'Complete'
    );

    const userName = await newTransaction.selectRandomUser();

    await expect(await newTransaction.activeElements[0]).toHaveText('Payment');
    await expect(await newTransaction.allSteps[0]).toHaveElementClass(
      'MuiStep-completed'
    );
    await newTransaction.typeAmountField(amount);
    const generatedTextNote = await newTransaction.typeAddNoteField();

    await newTransaction.clickPayBtn();
    await expect(await newTransaction.transactionMsg).toHaveText(
      'Transaction Submitted!'
    );
    const infoText = await newTransaction.infoText.getText();
    const formattedAmount: string = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    await expect(infoText).toEqual(
      `Paid ${formattedAmount} for ${generatedTextNote}`
    );
    await expect(await (await newTransaction.userName).getText()).toEqual(
      `${userName}`
    );
    await expect(await newTransaction.returnToTransactionBtn).toBeDisplayed();
    await expect(
      await newTransaction.createAnotherTransactionBtn
    ).toBeDisplayed();
    await newTransaction.allSteps.forEach(async (element) => {
      await expect(element).toHaveElementClass('MuiStep-completed');
    });

    await homePage.clickHomeSideNav();

    await personalPage.open();
    await personalPage.waitForTransactionToAppear();

    const paidInfoText = await personalPage.paidInfoText[0].getText();

    await expect(paidInfoText).toEqual(
      `${account.firstName} ${account.lastName} paid ${userName}`
    );
    const noteText = await personalPage.noteText[0].getText();
    await expect(noteText).toEqual(`${generatedTextNote}`);
    const paidAmount = await personalPage.amount[0].getText();

    const numericValue: number = Number(formattedAmount.replace('$', ''));
    const negatedValue: number = -numericValue;
    const formattedString: string = negatedValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    await expect(paidAmount).toEqual(`${formattedString}`);
  });
  it('TC_10: "Request Payment"', async () => {
    await homePage.clickAccountSideNav();

    const account = await accountHelper.getUserName();
    await homePage.clickNewTransactionBtn();

    await expect(browser).toHaveUrl(`${config.baseUrl}transaction/new`);
    await expect(await newTransaction.searchInput).toBeDisplayed();
    await expect(await newTransaction.activeElements).toHaveLength(1);
    await expect(await newTransaction.activeElements[0]).toHaveText(
      'Select Contact'
    );
    await expect(await newTransaction.disabledElements).toHaveLength(2);
    await expect(await newTransaction.disabledElements[0]).toHaveText(
      'Payment'
    );
    await expect(await newTransaction.disabledElements[1]).toHaveText(
      'Complete'
    );

    const userName = await newTransaction.selectRandomUser();

    await expect(await newTransaction.activeElements[0]).toHaveText('Payment');
    await expect(await newTransaction.allSteps[0]).toHaveElementClass(
      'MuiStep-completed'
    );

    const requestAmount = await newTransactionPage.typeAmountField();

    const generatedTextNote = await newTransaction.typeAddNoteField();

    await newTransaction.clickRequestBtn();

    await expect(await newTransaction.transactionMsg).toHaveText(
      'Transaction Submitted!'
    );
    const infoText = await newTransaction.infoText.getText();
    const formattedAmount: string = requestAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    await expect(infoText).toEqual(
      `Requested ${formattedAmount} for ${generatedTextNote}`
    );
    await expect(await (await newTransaction.userName).getText()).toEqual(
      `${userName}`
    );
    await expect(await newTransaction.returnToTransactionBtn).toBeDisplayed();
    await expect(
      await newTransaction.createAnotherTransactionBtn
    ).toBeDisplayed();
    await newTransaction.allSteps.forEach(async (element) => {
      await expect(element).toHaveElementClass('MuiStep-completed');
    });
    await homePage.clickHomeSideNav();

    await personalPage.open();
    await personalPage.waitForTransactionToAppear();

    const requestInfoText = await personalPage.paidInfoText[0].getText();

    await expect(requestInfoText).toEqual(
      `${account.firstName} ${account.lastName} requested ${userName}`
    );
    const noteText = await personalPage.noteText[0].getText();
    await expect(noteText).toEqual(`${generatedTextNote}`);

    const paidAmount = await personalPage.amount[0].getText();

    const formattedNumber = `+${formattedAmount}`;
    await expect(paidAmount).toEqual(`${formattedNumber}`);
  });

  after(async () => {
    await loginHelper.logout();
  });
});
