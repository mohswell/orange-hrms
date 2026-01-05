import { test } from "@/fixtures";

test.describe('Sidebar Functionality', () => {

    test('I can view the default sidebar menu items @smoke @navigation', async ({ sideBarPage }) => {
        await sideBarPage.isDesktopMenuOpen();
    });
});