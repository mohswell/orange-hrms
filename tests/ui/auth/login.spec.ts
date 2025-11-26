import { USERNAME, PASSWORD } from "@/env";
import { test } from "@/fixtures";

test.describe(
  "As a user, I want to @login to the application @smoke",
  () => {
    test("should log in successfully with valid credentials", async ({
      loginPage,
    }) => {
      await loginPage.logIn(USERNAME, PASSWORD);
    });
  }
);
