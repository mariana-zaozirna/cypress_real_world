import loginPage from '../pageObjects/login.page.ts';
import homePage from '../pageObjects/home.page.ts';

class LoginHelper {
  public async login(username: string, password: string) {
    await loginPage.open();
    await loginPage.login(username, password);
    await loginPage.clickSignInBtn();
  }

  public async logout() {
    await homePage.clickLogoutBtn();
  }
}
export default new LoginHelper();
