import { LoginPage, NavBarPage, SidebarPage, ForgotPasswordPage } from "@/pages";
import { test as base, Page } from "@playwright/test";
import { URL } from "@/env";

export type FrameworkFixtures = {
  page: Page;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  sideBarPage: SidebarPage;
  navBarPage: NavBarPage;

  baseUrl: string;
};

export const test = base.extend<FrameworkFixtures>({
  page: async ({ page }, use) => {
    await page.goto(URL);
    await use(page); // Hand over control to the test
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
    // !Teardown navigate back to login page
    await page.goto(URL);
  },
  sideBarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
  navBarPage: async ({ page }, use) => {
    await use(new NavBarPage(page));
  }
});
