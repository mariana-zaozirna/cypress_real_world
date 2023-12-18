import { faker } from '@faker-js/faker';

const fakeEmail = faker.internet.email();
class EmailGeneratorHelper {
  public emailWithoutAt() {
    return fakeEmail.replace(/@/g, '');
  }

  public emailWithoutDot() {
    return fakeEmail.replace(/\./g, '');
  }

  public emailWithoutDotCom() {
    return fakeEmail.replace(/\.[^.]+$/, '');
  }
  public emailWithSpaceBeforeAt() {
    return fakeEmail.replace(/@/, ' @');
  }
}
export default new EmailGeneratorHelper();
