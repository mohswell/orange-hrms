import { test, expect } from "@/fixtures";
import { httpStatusCodes } from "@/types/constants";

test.describe('An Admin should access the localization configuration', () => {
  test(
    'Localization @api @config data is successfully fetched',
    async ({ localization }) => {
      const response = await localization.fetch();
      expect(response.status).toBe(httpStatusCodes.ok);
      expect(response.ok).toBeTruthy();
    }
  );
});
