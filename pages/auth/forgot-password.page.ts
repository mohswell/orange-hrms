import { expect, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { USERNAME } from "@/env";

/**
 * This is the page object for the Login functionality.
 * @export
 * @class ForgotPasswordPage
 * @typedef {ForgotPasswordPage}
 */
export class ForgotPasswordPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }


    async isForgotPasswordSuccessful(): Promise<void> {
        await expect(this.loginForm.forgotPasswordFormTitle).toBeVisible();
        await expect(this.loginForm.forgotPasswordSuccessMessage).toBeVisible();
    }


    async forgotPassword(): Promise<void> {
        await this.navigateToForgotPassword();
        await this.loginForm.username.fill(USERNAME);
        await this.loginForm.forgotPasswordButton.click();
        await this.isForgotPasswordSuccessful();
    }
}
