

import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class NavBarPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async isMenuOptionsVisible(): Promise<boolean> {
        return await this.assertUserDropdownOptionsVisible();
    }

}