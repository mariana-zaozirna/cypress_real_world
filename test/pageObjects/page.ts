export default class Page {
  public open(path: string) {
    return browser.url(`${path}`);
  }
}
