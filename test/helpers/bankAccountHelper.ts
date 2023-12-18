import { faker } from '@faker-js/faker';
import bankAccountPage from '../pageObjects/bankAccount.page.ts';

class BankAccount {
  private generateFakeBankName() {
    return faker.finance.accountName();
  }

  public async createBankAccount() {
    const fakeBankName = this.generateFakeBankName();
    await bankAccountPage.clickBankAccountBtn();
    await bankAccountPage.clickCreateBankAccountBtn();
    await bankAccountPage.fillBankNameInput(fakeBankName);
    await bankAccountPage.fillroutingNumberInput(faker.finance.routingNumber());
    await bankAccountPage.fillaccountNumberInput(
      faker.finance.accountNumber(9)
    );
    await bankAccountPage.clickSaveBtn();
    return fakeBankName;
  }

  public async createBankAccountInModal() {
    const fakeBankName = this.generateFakeBankName();
    await bankAccountPage.fillBankNameInput(fakeBankName);
    await bankAccountPage.fillroutingNumberInput(faker.finance.routingNumber());
    await bankAccountPage.fillaccountNumberInput(
      faker.finance.accountNumber(9)
    );
    await bankAccountPage.clickSaveBtn();
  }
}
export default new BankAccount();
