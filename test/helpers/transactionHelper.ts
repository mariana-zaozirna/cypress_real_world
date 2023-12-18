import newTransaction from '../pageObjects/newTransaction.page.ts';
import homePage from '../pageObjects/home.page.ts';

class TransactionHelper {
  private async prepareTransaction(userName: string, amount: number) {
    await homePage.clickNewTransactionBtn();
    await newTransaction.typeSearchUser(userName);
    await newTransaction.selectFirstUser();
    await newTransaction.typeAmountField(amount);
    await newTransaction.typeAddNoteField();
  }

  public async createPaidTransaction(userName: string, amount: number) {
    await this.prepareTransaction(userName, amount);
    await newTransaction.clickPayBtn();
  }

  public async createRequestedTransaction(userName: string, amount: number) {
    await this.prepareTransaction(userName, amount);
    await newTransaction.clickRequestBtn();
  }
}

export default new TransactionHelper();
