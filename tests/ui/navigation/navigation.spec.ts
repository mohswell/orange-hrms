import { test } from "@/fixtures";

test.describe(
    "As a user, I want to navigate to the homepage and access my profile @smoke @navigation",
    () => {
        test("It should allow navigation to the homepage and access to the profile", async ({
            navBarPage,
        }) => {
            await navBarPage.isMenuOptionsVisible();
        });

        test("It should open the desktop sidebar menu", async ({
            sideBarPage,

        }) => {
            await sideBarPage.openDesktopSidebarMenu();
        });

        test
            ("It should close the desktop sidebar menu", async ({
                sideBarPage,
            }) => {
                await sideBarPage.closeDesktopSidebarMenu();
            });
    }
);
