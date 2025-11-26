import { API_URL } from '@/env';
import { APIClient } from '@/services/api.service';
import { LocalizationService } from '@/services/configurations/localization.service';
import { ModuleService } from '@/services/configurations/module.service';
import { test as base } from '@playwright/test';

type APIFixtures = {
    api: APIClient;
    localization: LocalizationService;
    modules: ModuleService;
};

export const test = base.extend<APIFixtures>({
    api: async ({ request }, use) => {
        const apiClient = new APIClient(request, API_URL);
        await use(apiClient);
    },
    localization: async ({ api }, use) => {
        const localizationService = new LocalizationService(api);
        await use(localizationService);
    },
    modules: async ({ api }, use) => {
        const moduleService = new ModuleService(api);
        await use(moduleService);
    }
});
