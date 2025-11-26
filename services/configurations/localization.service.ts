
import { apiEndpoints } from "@/types/constants";
import { ApiResponse, localizationAPIResponse } from "@/types/api-schemas";
import { APIClient } from "../api.service";

export class LocalizationService {
    constructor(private client: APIClient) { }

    fetch(
    ): Promise<ApiResponse<{ localization: localizationAPIResponse[] }>> {
        return this.client.get<{ localization: localizationAPIResponse[] }>(
            apiEndpoints.configurations.localization
        );
    }
}
