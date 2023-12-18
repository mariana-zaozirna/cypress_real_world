import emailGeneratorHelper from '../helpers/emailGeneratorHelper.ts';
import loginHelper from '../helpers/loginHelper.ts';
import userSettingsPage from '../pageObjects/user.settings.page.ts';
import homePage from '../pageObjects/home.page.ts';

const username = process.env.TEST_USERNAME as string;
const password = process.env.TEST_PASSWORD as string;

describe('Account settings', () => {
  beforeEach(async () => {
    await loginHelper.login(username, password);
  });

  it('TC_15: Invalid email format', async () => {
    await homePage.clickAccountSideNav();
    await userSettingsPage.setEmailValue(emailGeneratorHelper.emailWithoutAt());
    await expect(await userSettingsPage.emailHelperText).toHaveText(
      'Must contain a valid email address'
    );
    await expect(userSettingsPage.saveBtn).toHaveElementClass('Mui-disabled');

    await userSettingsPage.setEmailValue(
      emailGeneratorHelper.emailWithoutDot()
    );
    await expect(userSettingsPage.emailHelperText).toHaveText(
      'Must contain a valid email address'
    );
    await expect(userSettingsPage.saveBtn).toHaveElementClass('Mui-disabled');

    await userSettingsPage.setEmailValue(
      emailGeneratorHelper.emailWithoutDotCom()
    );
    await expect(userSettingsPage.emailHelperText).toHaveText(
      'Must contain a valid email address'
    );
    await expect(userSettingsPage.saveBtn).toHaveElementClass('Mui-disabled');

    await userSettingsPage.setEmailValue(
      emailGeneratorHelper.emailWithSpaceBeforeAt()
    );
    await expect(userSettingsPage.emailHelperText).toHaveText(
      'Must contain a valid email address'
    );
    await expect(userSettingsPage.saveBtn).toHaveElementClass('Mui-disabled');
  });
});
