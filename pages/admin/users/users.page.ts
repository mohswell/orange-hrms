import { Locator, Page } from "@playwright/test";
import { BasePage } from "@/pages/base.page"
import { expect } from "@/fixtures";

/**
 * This is the page object for the Users functionality.
 * @export
 * @class UsersPage
 * @typedef {UsersPage}
 */
export class UsersPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get createUserButton(): Locator {
        return this.page.getByRole("button", { name: "Add" });
    }

    async navigateToCreateUserPage(): Promise<void> {
        // await this.navigateToUsersPage(); // handled in the fixture already
        await this.createUserButton.click();
    }

    get usersForm() {
        const form = this.page.locator('form.oxd-form');

        return {
            // Title
            usersFormTitle: this.page.getByRole('heading', { name: 'Add User' }),

            // User Role dropdown (scoped by label)
            userRole: form
                .locator('.oxd-input-group', { hasText: 'User Role' })
                .getByText('-- Select --'),

            // Employee Name (real input)
            employeeName: form
                .locator('.oxd-input-group', { hasText: 'Employee Name' })
                .locator('input'),

            // Status dropdown (scoped by label)
            status: form
                .locator('.oxd-input-group', { hasText: 'Status' })
                .getByText('-- Select --'),

            // Text inputs
            username: form
                .locator('.oxd-input-group', { hasText: 'Username' })
                .locator('input'),

            password: form
                .locator('.oxd-input-group', { hasText: 'Password' })
                .locator('input[type="password"]')
                .first(),

            confirmPassword: form
                .locator('.oxd-input-group', { hasText: 'Confirm Password' })
                .locator('input[type="password"]'),

            // Buttons
            saveButton: this.page.getByRole('button', { name: 'Save' }),
            cancelButton: this.page.getByRole('button', { name: 'Cancel' }),
        };
    }

    async selectDropdown(label: string, option: string): Promise<void> {
        // Find dropdown by label and click it
        const dropdown = this.page
            .locator('.oxd-input-group', { hasText: label })
            .locator('[role="button"], .oxd-select-text');
        await dropdown.click();
        await this.page.getByRole('option', { name: option }).click();
    }

    async createUser(
        userRole: string,
        employeeName: string,
        status: string,
        username: string,
        password: string
    ): Promise<void> {
        await this.selectDropdown('User Role', userRole);
        
        // Employee Name (autocomplete)
        await this.usersForm.employeeName.fill(employeeName);
        await this.page.getByText(employeeName, { exact: true }).click();
        
        await this.selectDropdown('Status', status);
        
        // Text inputs
        await this.usersForm.username.fill(username);
        await this.usersForm.password.fill(password);
        await this.usersForm.confirmPassword.fill(password);
        
        await this.usersForm.saveButton.click();
    }

    getUserRow(username: string): Locator {
        return this.page.locator('tr', { hasText: username });
    }

    getUserCell(username: string): Locator {
        return this.page.getByRole('cell', { name: username });
    }

    get successToastMessage(): Locator {
        return this.page.locator(".oxd-toast");
    }

    async isUserVisible(username: string): Promise<void> {
        await this.page.waitForTimeout(10000); // wait for the table to refresh
        await expect(this.getUserCell(username)).toBeVisible();
    }

    async isUserCreatedSuccessfully(): Promise<void> {
        await expect(this.successToastMessage).toBeVisible();
    }

    async isUsersPageVisible(): Promise<boolean> {
        return this.page.getByRole("heading", { name: "System Users" }).isVisible();
    }

}