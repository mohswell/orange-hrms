import { assertValue } from "@/helpers/utils";

export const URL = assertValue(
  process.env.URL!,
  "Missing environment variable: URL"
);

export const API_URL = assertValue(
  process.env.API_URL!,
  "Missing environment variable: API_URL"
);

export const USERNAME = assertValue(
  process.env.USERNAME!,
  "Missing environment variable: USERNAME"
);
export const PASSWORD = assertValue(
  process.env.PASSWORD!,
  "Missing environment variable: PASSWORD"
);

export const ENVIRONMENT = assertValue(
  process.env.ENVIRONMENT!,
  "Missing environment variable: ENVIRONMENT"
);
