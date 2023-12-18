import loginPage from '../pageObjects/login.page.ts';
import signUpPage from '../pageObjects/signUp.page.ts';
import { config } from '../../wdio.conf.ts';
import homePage from '../pageObjects/home.page.ts';

describe('Sign-Up', () => {
  it('TC_4:Sign-Up with "Password" containing 3 characters', async () => {
    await signUpPage.open();
    await signUpPage.fillSignUpFormWithFaker(true);
    await expect(await signUpPage.pswrdHelperText).toHaveText(
      'Password must contain at least 4 characters'
    );
    await expect(await signUpPage.pswdLabel).toHaveElementClass('Mui-error');
    await expect(await signUpPage.asteriskError).toHaveElementClass(
      'Mui-error'
    );
    await expect(await signUpPage.signUpBorderColor).toHaveElementClass(
      'Mui-error'
    );
    await expect(await signUpPage.signUpBtn).toBeDisabled();
  });
  it('TC_5: Valid Sign-up', async () => {
    await signUpPage.open();
    const fakerData = await signUpPage.fillSignUpFormWithFaker();
    const savedFakeUserName = fakerData.userName;
    const savedPswd = fakerData.password;
    await signUpPage.clickSignUpBtn();
    await expect(browser).toHaveUrl('http://localhost:3000/signin');
    await loginPage.login(savedFakeUserName, savedPswd);
    await loginPage.clickSignInBtn();
    await expect(browser).toHaveUrl(config.baseUrl as string);
    await expect(await homePage.dialogTitle).toHaveText(
      'Get Started with Real World App'
    );
    await expect(await homePage.nextBtn).toBeDisplayed();
  });
});
