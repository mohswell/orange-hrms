import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Determine which environment file to load
const environmentPath = process.env.ENVIRONMENT
  ? path.resolve(__dirname, `./env/.env.${process.env.ENVIRONMENT}`)
  : path.resolve(__dirname, './env/.env.dev');

// Override system vars (e.g., Windows USERNAME) so dotenv values win
dotenv.config({ path: environmentPath, override: true, quiet: true });

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
      name: 'Guest User - UI',
      testDir: './tests/ui/auth',
      testIgnore: ['**/auth/login.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'Admin User - UI',
      testDir: './tests/ui',
      testIgnore: ['**/auth/forgot-password.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_PATH,
      },
    },

    {
      name: 'API',
      testDir: './tests/api',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_PATH,
      },
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
