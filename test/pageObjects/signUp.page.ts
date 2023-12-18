import Page from './page.ts';
import { faker } from '@faker-js/faker';

const inputFirstName = '#firstName';
const inputLastName = '#lastName';
const inputUsername = '#username';
const inputPswd = '#password';
const inoutConfirmPswd = '#confirmPassword';
const signUpBtn = '[data-test="signup-submit"]';
const pswrdHelperText = '#password-helper-text';
const pswdLabel = '#password-label';
const signUpBorderColor = '.MuiOutlinedInput-root.Mui-error';
const asteriskError = '.MuiInputLabel-asterisk.Mui-error';

class SignUp extends Page {
  public get inputFirstName() {
    return $(inputFirstName);
  }
  public get inputLastName() {
    return $(inputLastName);
  }
  public get inputUsername() {
    return $(inputUsername);
  }
  public get inputPswd() {
    return $(inputPswd);
  }
  public get inoutConfirmPswd() {
    return $(inoutConfirmPswd);
  }
  public get signUpBtn() {
    return $(signUpBtn);
  }
  public get pswrdHelperText() {
    return $(pswrdHelperText);
  }
  public get pswdLabel() {
    return $(pswdLabel);
  }
  public get signUpBorderColor() {
    return $(signUpBorderColor);
  }
  public get asteriskError() {
    return $(asteriskError);
  }
  public async fillSignUpFormWithFaker(useShortPassword = false) {
    let generatedPassword = faker.internet.password();

    if (useShortPassword) {
      generatedPassword = generatedPassword.slice(0, 3);
    }
    return this.fillSignUpForm(faker.internet.userName(), generatedPassword);
  }
  public async fillSignUpForm(userName: string, password: string) {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      userName: userName,
      password: password,
      confirmPswd: password
    };
    await this.inputFirstName.setValue(data.firstName);
    await this.inputLastName.setValue(data.lastName);
    await this.inputUsername.setValue(userName);
    await this.inputPswd.setValue(password);
    await this.inoutConfirmPswd.setValue(data.confirmPswd);

    return data;
  }
  public async clickSignUpBtn() {
    await this.signUpBtn.click();
  }
  public open() {
    return super.open('signup');
  }
}
export default new SignUp();
