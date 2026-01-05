import { test } from "@/fixtures";
import { generateRandomUsername } from "@/helpers/faker";

test.describe('Users Functionality', () => {
    test('Should create a new user', async ({ usersPage }) => {
        await usersPage.navigateToCreateUserPage();

        const username = generateRandomUsername();
        await usersPage.createUser(
            'ESS',
            'Charles  Carter',
            'Enabled',
            username,
            'Password123!'
        );

        await usersPage.isUserVisible(username);
    });
});