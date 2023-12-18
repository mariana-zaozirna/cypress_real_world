import signUpPage from '../pageObjects/signUp.page.ts';
import loginHelper from '../helpers/loginHelper.ts';
import homePage from '../pageObjects/home.page.ts';
import bankAccountHelper from './bankAccountHelper.ts';
class SignUpHelper {
  public async signUp(userName: string, password: string) {
    await signUpPage.open();
    await signUpPage.fillSignUpForm(userName, password);
    await signUpPage.clickSignUpBtn();
    await loginHelper.login(userName, password);
    await (await homePage.nextBtn).click();
    await bankAccountHelper.createBankAccountInModal();
    await (await homePage.doneBtn).click();
  }
}

export default new SignUpHelper();
