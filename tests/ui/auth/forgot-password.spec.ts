

import { test } from "@/fixtures";

test.describe(
    "As a user, I want to reset my password when I forget it @smoke @forgot-password",
    () => {
        test("It should send a reset password link to the user's email", async ({
            forgotPasswordPage,
        }) => {
            await forgotPasswordPage.forgotPassword();
        });
    }
);
