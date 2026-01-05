import { LoginPage, NavBarPage, SidebarPage, ForgotPasswordPage } from "@/pages";
import { test as base, Page } from "@playwright/test";
import { URL } from "@/env";
import { UsersPage } from "@/pages/admin/users/users.page";
import { uiPages } from "@/types/constants";

export type FrameworkFixtures = {
  page: Page;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPasswordPage;
  sideBarPage: SidebarPage;
  navBarPage: NavBarPage;
  usersPage: UsersPage

  baseUrl: string;
};

export const test = base.extend<FrameworkFixtures>({
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
  },
  usersPage: async ({ page }, use) => {
    await page.goto(uiPages.admin.users.view);
    await use(new UsersPage(page));
  },
});
