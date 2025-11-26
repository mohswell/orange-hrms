/**
 * Utility functions for various helper methods.
 */

import { Cookie, StorageState } from '@/types/api-schemas';
import { STORAGE_PATH } from '@/types/constants';
import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';


export function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }

  return value;
}


export async function saveStorageState(page: Page, storagePath: string) {
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.context().storageState({ path: storagePath });
}


/**
 * Reads storage state from disk and returns cookies for a specific baseUrl.
 */

export function getCookies(baseUrl: string): string | undefined {
  try {
    const storagePath = path.resolve(process.cwd(), STORAGE_PATH);
    if (!fs.existsSync(storagePath)) return;

    const state: StorageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
    const baseHost = new URL(baseUrl).host;

    const cookies = state.cookies
      .filter(c => {
        if (!c.domain && !c.url) return false;
        if (c.domain && (c.domain === baseHost || c.domain.endsWith(baseHost))) return true;
        if (c.url) {
          try { return new URL(c.url).host === baseHost; } catch { return false; }
        }
        return false;
      })
      .map(c => `${c.name}=${c.value}`);

    return cookies.length ? cookies.join('; ') : undefined;
  } catch {
    return undefined;
  }
}

