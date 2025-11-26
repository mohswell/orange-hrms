import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class SidebarPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openDesktopSidebarMenu(): Promise<void> {
        if (!(await this.isDesktopMenuOpen())) {
            await this.DesktopMenuButton.click();
        }
    }

    async closeDesktopSidebarMenu(): Promise<void> {
        if (await this.isDesktopMenuOpen()) {
            await this.DesktopMenuButton.click();
        }
    }
}