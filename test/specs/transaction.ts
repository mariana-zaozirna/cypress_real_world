import { faker } from '@faker-js/faker';
import accountHelper from '../helpers/accountHelper.ts';
import loginHelper from '../helpers/loginHelper.ts';
import transactionHelper from '../helpers/transactionHelper.ts';
import homePage from '../pageObjects/home.page.ts';
import notificationsPage from '../pageObjects/notifications.page.ts';
import personalPage from '../pageObjects/personal.page.ts';
import transactionDetailsPage from '../pageObjects/transactionDetails.page.ts';

const userNameToCreate = process.env.TEST_USERNAME as string;
const passwordToCreate = process.env.TEST_PASSWORD as string;

const userNameToCheck = process.env.USERNAME_TO_CHECK as string;
const passwordToCheck = process.env.PASSWORD_TO_CHECK as string;

const generatedAmount = Math.floor(Math.random() * 999) + 1;

describe('Transaction', () => {
  beforeEach(async () => {
    await loginAsTransactionSender();
  });

  const loginAsNotificationReceiver = async () => {
    await loginHelper.login(userNameToCheck, passwordToCheck);
  };

  const switchToNotificationReceiver = async () => {
    await loginHelper.logout();
    await loginAsNotificationReceiver();
  };

  const switchToTransactionSender = async () => {
    loginHelper.logout();
    await loginAsTransactionSender();
  };

  const loginAsTransactionSender = async () => {
    await loginHelper.login(userNameToCreate, passwordToCreate);
  };

  it('TC_11: Comment notification', async () => {
    await transactionHelper.createRequestedTransaction(
      userNameToCheck,
      generatedAmount
    );
    await switchToNotificationReceiver();

    const transactionReceiver = await accountHelper.getUserName();
    await personalPage.open();
    await personalPage.clickMineTab();
    await personalPage.waitForTransactionToAppear();
    await (await personalPage.paidInfoText)[0].click();
    await transactionDetailsPage.setComment(faker.lorem.paragraph());
    await expect(await transactionDetailsPage.commentsSection).toBeDisplayed();

    await switchToTransactionSender();
    await homePage.clickNotificationSideNav();

    const expectedText = `${transactionReceiver.firstName} ${transactionReceiver.lastName} commented on a transaction.`;
    await expect(await notificationsPage.getFirstNotifications()).toHaveText(
      expect.stringContaining(expectedText)
    );
  });

  it('TC_12: Like notification', async () => {
    await transactionHelper.createRequestedTransaction(
      userNameToCheck,
      generatedAmount
    );
    await switchToNotificationReceiver();

    const transactionReceiver = await accountHelper.getUserName();
    await personalPage.open();
    await personalPage.clickMineTab();
    await personalPage.waitForTransactionToAppear();
    await (await personalPage.paidInfoText)[0].click();
    await transactionDetailsPage.likeTransaction();
    await expect(transactionDetailsPage.likeButton).toHaveElementClass(
      'Mui-disabled'
    );

    await switchToTransactionSender();
    await homePage.clickNotificationSideNav();

    const expectedText = `${transactionReceiver.firstName} ${transactionReceiver.lastName} liked a transaction.`;
    await expect(await notificationsPage.getFirstNotifications()).toHaveText(
      expect.stringContaining(expectedText)
    );
  });

  it('TC_13: Request payment notification', async () => {
    const transactionSender = await accountHelper.getUserName();
    await transactionHelper.createRequestedTransaction(
      userNameToCheck,
      generatedAmount
    );
    await switchToNotificationReceiver();
    await homePage.clickNotificationSideNav();
    const expectedText = `${transactionSender.firstName} ${transactionSender.lastName} requested payment.`;
    await expect(await notificationsPage.getFirstNotifications()).toHaveText(
      expect.stringContaining(expectedText)
    );
  });

  it('TC_14: Receive payment notification', async () => {
    await transactionHelper.createPaidTransaction(
      userNameToCheck,
      generatedAmount
    );
    await switchToNotificationReceiver();
    const transactionReceiver = await accountHelper.getUserName();
    await homePage.clickNotificationSideNav();
    const expectedText = `${transactionReceiver.firstName} ${transactionReceiver.lastName} received payment.`;
    await expect(await notificationsPage.getFirstNotifications()).toHaveText(
      expect.stringContaining(expectedText)
    );
  });
  
  afterEach(async () => {
    await loginHelper.logout();
  });
});
