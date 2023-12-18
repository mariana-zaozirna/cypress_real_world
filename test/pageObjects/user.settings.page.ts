import Page from './page.ts';
import { Key } from 'webdriverio';

const firstName = '#user-settings-firstName-input';
const lastName = '#user-settings-lastName-input';
const emailInput = '#user-settings-email-input';
const emailHelperText = '#user-settings-email-input-helper-text';
const saveBtn = '[data-test="user-settings-submit"]';

class UserSettings extends Page {
  public get firstName() {
    return $(firstName);
  }
  public get saveBtn() {
    return $(saveBtn);
  }
  public get lastName() {
    return $(lastName);
  }
  public get emailInput() {
    return $(emailInput);
  }
  public get emailHelperText() {
    return $(emailHelperText);
  }
  public open() {
    return super.open('user/settings');
  }
  public async clickEmailInput() {
    await this.emailInput.click();
  }
  public async setEmailValue(value: string) {
    await this.clearEmailInput();
    await (await this.emailInput).setValue(value);
  }
  public async clearEmailInput() {
    let element = await this.emailInput;
    await element.setValue('');
    (await (await this.emailInput).getValue()).split('').forEach(async () => {
      await browser.keys(Key.Backspace);
    });
  }
}

export default new UserSettings();
