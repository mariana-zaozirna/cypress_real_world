import { config } from '../../wdio.conf.ts';
import homePage from '../pageObjects/home.page.ts';
import personalPage from '../pageObjects/personal.page.ts';
import transactionHelper from '../helpers/transactionHelper.ts';
import { faker } from '@faker-js/faker';
import signUpHelper from '../helpers/signUpHelper.ts';
const username = faker.internet.userName();
const password = faker.internet.password();
const amount = Number(faker.finance.amount({ min: 0, max: 400 }));

describe('Filter amount', () => {
  before(async () => {
    await signUpHelper.signUp(username, password);
    await transactionHelper.createPaidTransaction(username, amount);
    await personalPage.open();
  });


  it('TC_6: Filter amount range (500-1000)', async () => {
    await expect(browser).toHaveUrl(`${config.baseUrl}personal`);
    await homePage.clickAmountRangeBtn(-5);
    await expect(personalPage.createTransactionBtn).toBeDisplayed();
    await expect(personalPage.emptyList).toBeDisplayed();
  });
  it('TC_7: Filter amount range (1-500)', async () => {
    await expect(browser).toHaveUrl(`${config.baseUrl}personal`);
    await homePage.clickAmountRangeBtn(1);

    const paidAmountArray = await personalPage.amount;

    for (const element of paidAmountArray) {
      const text = await element.getText();
      const amount = parseInt(text.split('$')[1], 10);
      await expect(amount < 500).toBe(true);
    }
  });
  it('TC_8: "Clear filter" functionality', async () => {
    await expect(browser).toHaveUrl(`${config.baseUrl}personal`);
    await homePage.clickAmountRangeBtn(7);
    await homePage.clickClearBtn();
    await expect(await homePage.defaultAmountRangeText).toHaveText(
      `Amount Range: $0 - $1,000`
    );
  });
});
