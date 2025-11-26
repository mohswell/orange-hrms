
import { test, expect } from "@/fixtures";
import { httpStatusCodes } from "@/types/constants";

test.describe('An Admin should access the modules configuration', () => {
  test(
    'Modules @api @config data is successfully fetched',
    async ({ modules }) => {
      const response = await modules.fetch();
      expect(response.status).toBe(httpStatusCodes.ok);
      expect(response.ok).toBeTruthy();
    }
  );
});
