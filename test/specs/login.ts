import loginPage from '../pageObjects/login.page.ts';
import homePage from '../pageObjects/home.page.ts';
import { config } from '../../wdio.conf.ts';
import { faker } from '@faker-js/faker';
import loginHelper from '../helpers/loginHelper.ts';

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

const generatedPswd = faker.internet.password();

describe('Login', () => {
  it('TC_1: Login with valid credentials', async () => {
    await loginPage.open();
    await loginPage.login(username, password);
    await expect(await loginPage.inputPassword).toHaveAttribute(
      'type',
      'password'
    );
    await loginPage.clickSignInBtn();
    await expect(browser).toHaveUrl(config.baseUrl as string);
    const sideUserName = await homePage.sideUsername.getHTML(false);
    await expect(sideUserName.replace('@', '')).toEqual(username);
    await homePage.accountBalance.isDisplayed();
    await loginHelper.logout();
  });
  it('TC_2: Logout', async () => {
    await loginHelper.login(username, password);
    await homePage.clickLogoutBtn();
    await expect(browser).toHaveUrl('http://localhost:3000/signin');
    await expect(await loginPage.inputUsername).toBeDisplayed();
    await expect(await loginPage.inputUsername).toHaveValue('');
    await expect(await loginPage.inputPassword).toBeDisplayed();
    await expect(await loginPage.inputPassword).toHaveValue('');
    await expect(await loginPage.signInBtn).toBeDisplayed();
  });
  it('TC_3:Login with invalid password ', async () => {
    await loginPage.open();
    await loginPage.login(username, generatedPswd);
    await loginPage.clickSignInBtn();
    await expect(await loginPage.alertMsg).toHaveText(
      'Username or password is invalid'
    );
  });
});
