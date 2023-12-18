import Page from './page.ts';

const sideNavUsername = '[data-test="sidenav-username"]';
const accountBalance = '[data-test="sidenav-user-balance"]';
const dialogTitle = '[data-test="user-onboarding-dialog-title"]';
const nextBtn = '[data-test="user-onboarding-next"]';
const doneBtn = '[data-test="user-onboarding-next"]';
const logoutBtn = '[data-test="sidenav-signout"]';
const newTransactionBtn = '[data-test="nav-top-new-transaction"]';
const homeSideNav = '[data-test="sidenav-home"]';
const accountSideNav = '[data-test="sidenav-user-settings"]';
const amountRangeBtn =
  '[data-test="transaction-list-filter-amount-range-button"]';
const amountSlider =
  '[data-test="transaction-list-filter-amount-range-slider"]';
const clearBtn = '[data-test="transaction-list-filter-amount-clear-button"]';
const defaultAmountRangeText =
  '[data-test="transaction-list-filter-amount-range-text"]';
const notificationSideNav = '[data-test="sidenav-notifications"]';

class HomePage extends Page {
  public get sideUsername() {
    return $(sideNavUsername);
  }
  public get defaultAmountRangeText() {
    return $(defaultAmountRangeText);
  }
  public get amountRangeBtn() {
    return $(amountRangeBtn);
  }
  public get amountSlider() {
    return $(amountSlider);
  }
  public get clearBtn() {
    return $(clearBtn);
  }
  public get accountSideNav() {
    return $(accountSideNav);
  }
  public get homeSideNav() {
    return $(homeSideNav);
  }
  public get notificationSideNav() {
    return $(notificationSideNav);
  }
  public get accountBalance() {
    return $(accountBalance);
  }
  public get dialogTitle() {
    return $(dialogTitle);
  }
  public get nextBtn() {
    return $(nextBtn);
  }
  public get doneBtn() {
    return $(doneBtn);
  }
  public get logoutBtn() {
    return $(logoutBtn);
  }
  public get newTransactionBtn() {
    return $(newTransactionBtn);
  }
  public async clickLogoutBtn() {
    await (await this.logoutBtn).click();
  }
  public async clickClearBtn() {
    await this.clearBtn.click();
  }
  public async clickAmountRangeBtn(x: number) {
    (await this.amountRangeBtn).click();
    await this.amountSlider.click({ x: x });
  }
  public async clickNewTransactionBtn() {
    await this.newTransactionBtn.click();
  }
  public async clickHomeSideNav() {
    await this.homeSideNav.click();
  }
  public async clickNotificationSideNav() {
    await this.notificationSideNav.click();
  }
  public async clickAccountSideNav() {
    await this.accountSideNav.click();
  }
}

export default new HomePage();
