import { USER_DROPDOWN_MENU_OPTIONS } from "@/types/menu-options";
import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) { }
  getPage() {
    return this.page;
  }

  // =========================
  // Core Navigation Bar
  // =========================
  /** Topbar locators */
  get navigation(): {
    mobileMenuIcon: Locator;
    breadcrumbTitle: Locator;
    upgradeButton: Locator;
    userDropdown: Locator;
    userName: Locator;
    userProfileImage: Locator;
    helpButton: Locator;
    sidePanelCloseButton: Locator;
  } {
    const topBar = this.page.locator("header.oxd-topbar");

    return {
      mobileMenuIcon: topBar.locator("i.oxd-topbar-header-hamburger"),
      breadcrumbTitle: topBar.locator("h6.oxd-topbar-header-breadcrumb-module"),
      upgradeButton: topBar.locator("button.orangehrm-upgrade-button"),
      userDropdown: topBar.locator("span.oxd-userdropdown-tab"),
      userName: topBar.locator("p.oxd-userdropdown-name"),
      userProfileImage: topBar.locator("img.oxd-userdropdown-img"),
      helpButton: topBar.locator('button[title="Help"] i.bi-question-lg'),
      sidePanelCloseButton: this.page.locator("i.oxd-sidepanel-header-close"),
    };
  }

  /** User dropdown options mapped by enum */
  get userDropdownOptions(): Record<USER_DROPDOWN_MENU_OPTIONS, Locator> {
    const dropdown = this.page.locator("ul.oxd-dropdown-menu");

    return {
      [USER_DROPDOWN_MENU_OPTIONS.ABOUT]: dropdown.getByRole("menuitem", { name: "About" }),
      [USER_DROPDOWN_MENU_OPTIONS.SUPPORT]: dropdown.getByRole("menuitem", { name: "Support" }),
      [USER_DROPDOWN_MENU_OPTIONS.CHANGE_PASSWORD]: dropdown.getByRole("menuitem", { name: "Change Password" }),
      [USER_DROPDOWN_MENU_OPTIONS.LOGOUT]: dropdown.getByRole("menuitem", { name: "Logout" })
    };
  }


  // =========================
  // About Modal
  // =========================
  getAboutModalTitle(): Locator {
    return this.page.getByRole("heading", { name: "About" });
  }

  getAboutModalCloseButton(): Locator {
    return this.page.locator("button.oxd-dialog-close-button");
  }

  // =========================
  // Support / Change Password Pages
  // =========================
  get supportPageTitle(): Locator {
    return this.page.getByRole("heading", {
      name: "Getting Started with OrangeHRM",
    });
  }

  get changePasswordPageTitle(): Locator {
    return this.page.getByRole("heading", { name: "Update Password" });
  }

  // =========================
  // Login Form
  // =========================
  get loginForm(): {
    loginFormTitle: Locator;
    username: Locator;
    password: Locator;
    loginButton: Locator;
    forgotPasswordLink: Locator;
    forgotPasswordText: Locator;
    forgotPasswordButton: Locator;
    forgotPasswordFormTitle: Locator;
    forgotPasswordSuccessMessage: Locator;
    errorText: Locator;
    demoCredentialsContainer: Locator;
    demoUsername: Locator;
    demoPassword: Locator;
  } {
    const demoCredentialsContainer = this.page.locator(
      "div.orangehrm-demo-credentials"
    );

    return {
      loginFormTitle: this.page.getByRole("heading", { name: "Login" }),
      username: this.page.getByRole("textbox", { name: "Username" }),
      password: this.page.getByRole("textbox", { name: "Password" }),
      loginButton: this.page.getByRole("button", { name: "Login" }),
      forgotPasswordLink: this.page.locator('div.orangehrm-login-forgot:has(p:text("Forgot your password?"))'),
      forgotPasswordText: this.page.getByRole("heading", {
        name: "Reset Password",
      }),
      forgotPasswordButton: this.page.getByRole("button", {
        name: "Reset Password",
      }),
      forgotPasswordFormTitle: this.page.locator(
        'div.orangehrm-card-container:has(h6:text("Reset Password link sent successfully")) h6'
      ),
      forgotPasswordSuccessMessage: this.page.locator(
        'div.orangehrm-card-container:has(p:text("A reset password link has been sent to you via email.")) p:text("A reset password link has been sent to you via email.")'
      ),

      errorText: this.page.locator(
        'div.oxd-alert-content:has(p:has-text("Invalid credentials"))'
      ),

      demoCredentialsContainer,
      demoUsername: demoCredentialsContainer.locator('p:has-text("Username")'),
      demoPassword: demoCredentialsContainer.locator('p:has-text("Password")'),
    };
  }

  // =========================
  // Login Footer / Social Links
  // =========================
  get loginFooter(): {
    footerContainer: Locator;
    linkedInLink: Locator;
    facebookLink: Locator;
    twitterLink: Locator;
    youtubeLink: Locator;
    copyrightText: Locator;
  } {
    const footerContainer = this.page.locator("div.orangehrm-login-footer");

    return {
      footerContainer,
      linkedInLink: footerContainer.locator('a[href*="linkedin.com"]'),
      facebookLink: footerContainer.locator('a[href*="facebook.com"]'),
      twitterLink: footerContainer.locator('a[href*="twitter.com"]'),
      youtubeLink: footerContainer.locator('a[href*="youtube.com"]'),
      copyrightText: footerContainer.locator("p.orangehrm-copyright"),
    };
  }

  // =========================
  // Home / Dashboard
  // =========================
  get homePageText(): Locator {
    return this.page.getByRole("heading", { name: "Dashboard" });
  }

  get mobileMenuButton(): Locator {
    return this.page.locator("header.oxd-topbar i.oxd-topbar-header-hamburger");
  }

  get DesktopMenuButton(): Locator {
    return this.page.locator('button.oxd-main-menu-button');
  }


  // =========================
  // Core Actions
  // =========================
  async isLoggedIn(): Promise<void> {
    await expect(this.homePageText).toBeVisible();
  }

  async isForgotPasswordFormVisible(): Promise<boolean> {
    return await this.loginForm.forgotPasswordLink.isVisible();
  }

  async navigateToForgotPassword(): Promise<void> {
    await this.loginForm.forgotPasswordLink.click();
    await expect(this.loginForm.forgotPasswordText).toBeVisible();
  }

  async isMobile(): Promise<boolean> {
    return await this.mobileMenuButton.isVisible();
  }

  async isDesktopMenuOpen(): Promise<boolean> {
    // Sidebar open if "chevron-left" icon is visible inside the button
    return await this.DesktopMenuButton.locator('i.bi-chevron-left').isVisible();
  }

  async isDesktopMenuCollapsed(): Promise<boolean> {
    return await this.DesktopMenuButton.locator('i.bi-chevron-right').isVisible();
  }


  async openMobileMenu(): Promise<void> {
    await this.navigation.mobileMenuIcon.click();
  }

  async closeMobileMenu(): Promise<void> {
    await this.navigation.sidePanelCloseButton.click();
  }

  async clickUpgrade(): Promise<void> {
    await this.navigation.upgradeButton.click();
  }

  async clickUserOption(option: USER_DROPDOWN_MENU_OPTIONS): Promise<void> {
    await this.navigation.userDropdown.click();
    await this.userDropdownOptions[option].click();
  }

  async assertUserDropdownOptionsVisible(): Promise<boolean> {
    await this.navigation.userDropdown.click();
    for (const key of Object.values(USER_DROPDOWN_MENU_OPTIONS)) {
      const option = this.userDropdownOptions[key];
      if (!option) {
        throw new Error(`Locator for dropdown option "${key}" is missing.`);
      }
      await expect(option).toBeVisible();
    }
    return true;
  }


  async openAboutModal(): Promise<void> {
    await this.clickUserOption(USER_DROPDOWN_MENU_OPTIONS.ABOUT);
    await expect(this.getAboutModalTitle()).toBeVisible();
    await this.getAboutModalCloseButton().click();
  }

  async navigateToSupportPage(): Promise<void> {
    await this.clickUserOption(USER_DROPDOWN_MENU_OPTIONS.SUPPORT);
    await expect(this.supportPageTitle).toBeVisible();
  }

  async navigateToChangePasswordPage(): Promise<void> {
    await this.clickUserOption(USER_DROPDOWN_MENU_OPTIONS.CHANGE_PASSWORD);
    await expect(this.changePasswordPageTitle).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.clickUserOption(USER_DROPDOWN_MENU_OPTIONS.LOGOUT);
    await expect(this.loginForm.loginFormTitle).toBeVisible();
  }
}
