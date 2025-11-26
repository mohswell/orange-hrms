import { test as base, mergeTests, request } from "@playwright/test";
import { test as pageObjectFixture } from "./pom/pom.fixture";
import { test as apiFixture } from "./api/api.fixture";

const test = mergeTests(pageObjectFixture, apiFixture);

const expect = base.expect;

export { test, expect, request };
