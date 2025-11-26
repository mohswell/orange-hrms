import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Determine which environment file to load
const environmentPath = process.env.ENVIRONMENT
  ? path.resolve(__dirname, `./env/.env.${process.env.ENVIRONMENT}`)
  : path.resolve(__dirname, './env/.env.dev');

dotenv.config({ path: environmentPath });

import { STORAGE_PATH } from './types/constants';

// Load env variables, then require env exports so they read from process.env.
// Use runtime require to avoid static import hoisting which can run `env/index.ts`
// before dotenv has populated process.env.
/* eslint-disable @typescript-eslint/no-var-requires */
const { URL } = require('./env');

export default defineConfig({
  globalSetup: require.resolve('./setup/global.ts'),
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['blob'], ['github']] : 'html',
  use: {
    baseURL: URL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Guest Users - Chromium',
      testMatch: /tests\/ui\/auth\/.*\.spec\.ts$/, // matches only auth folder
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },

      },
    },

    // Authenticated project — uses saved browser storage (cookies/localStorage)
    {
      name: 'Authenticated Users - Chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_PATH,
        viewport: { width: 1366, height: 768 },
      },
      // Skip UI auth/login tests for this authenticated project to avoid running
      // tests that expect a fresh state when the context is already logged-in.
      testIgnore: ['**/tests/ui/auth/**', '**/ui/auth/**'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
