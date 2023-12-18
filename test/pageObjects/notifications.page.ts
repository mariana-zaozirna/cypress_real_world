import Page from './page.ts';

const notifications = '//li[starts-with(@data-test, "notification-list-item")]';

class NotificationsPage extends Page {
  public get notifications() {
    return $$(notifications);
  }
  public async getFirstNotifications() {
    return (await $$(notifications))[0];
  }
  public open() {
    return super.open('notifications');
  }
}

export default new NotificationsPage();
