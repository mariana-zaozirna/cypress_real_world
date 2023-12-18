import { $ } from '@wdio/globals';
import Page from './page.ts';

const inputUsername = '#username';
const inputPswd = '#password';
const signInBtn = '[data-test="signin-submit"]';
const alertMsg = '.MuiAlert-message';

class LoginPage extends Page {
  public get inputUsername() {
    return $(inputUsername);
  }
  public get alertMsg() {
    return $(alertMsg);
  }
  public get inputPassword() {
    return $(inputPswd);
  }
  public get signInBtn() {
    return $(signInBtn);
  }
  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
  }
  public async clickSignInBtn() {
    await this.signInBtn.click();
  }
  public open() {
    return super.open('signin');
  }
}

export default new LoginPage();
