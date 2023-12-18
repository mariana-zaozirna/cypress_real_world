import homePage from '../pageObjects/home.page.ts';
import userSettingsPage from '../pageObjects/user.settings.page.ts';

class AccountHelper {
  public async getUserName() {
    await homePage.clickAccountSideNav();
    return {
      firstName: await (await userSettingsPage.firstName).getValue(),
      lastName: await (await userSettingsPage.lastName).getValue()
    };
  }
}

export default new AccountHelper();
