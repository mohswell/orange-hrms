import { chromium } from 'playwright';
import { URL, USERNAME, PASSWORD } from '@/env';
import { LoginPage } from '@/pages';
import { STORAGE_PATH } from '@/types/constants';
import { saveStorageState } from '@/helpers/utils';

export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(URL);
    const loginPage = new LoginPage(page);
    await loginPage.logIn(USERNAME, PASSWORD);

    await saveStorageState(loginPage.getPage(), STORAGE_PATH);

    await browser.close();
}
