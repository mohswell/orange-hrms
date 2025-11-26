import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

/**
 * This is the page object for the Login functionality.
 * @export
 * @class LoginPage
 * @typedef {LoginPage}
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isLoginCredentialsVisible(): Promise<boolean> {
    return (
      (await this.loginForm.demoCredentialsContainer.isVisible()) &&
      (await this.loginForm.demoUsername.isVisible()) &&
      (await this.loginForm.demoPassword.isVisible())
    );
  }

  async isLoginFooterVisible(): Promise<boolean> {
    return (
      (await this.loginFooter.footerContainer.isVisible()) &&
      (await this.loginFooter.linkedInLink.isVisible()) &&
      (await this.loginFooter.facebookLink.isVisible()) &&
      (await this.loginFooter.twitterLink.isVisible()) &&
      (await this.loginFooter.youtubeLink.isVisible()) &&
      (await this.loginFooter.copyrightText.isVisible())
    );
  }

  /**
   * Logs in using provided email and password.
   *
   * @param email - The email address to log in with.
   * @param password - The password to log in with.
   */
  async logIn(username: string, password: string): Promise<void> {
    await this.loginForm.username.fill(username);
    await this.loginForm.password.fill(password);
    await this.loginForm.loginButton.click();
    await this.isLoggedIn();
  }
}
