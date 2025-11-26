
import { apiEndpoints } from "@/types/constants";
import { ApiResponse, ModulesAPIResponse } from "@/types/api-schemas";
import { APIClient } from "../api.service";

export class ModuleService {
    constructor(private client: APIClient) { }

    fetch(
    ): Promise<ApiResponse<{ modules: ModulesAPIResponse[] }>> {
        return this.client.get<{ modules: ModulesAPIResponse[] }>(
            apiEndpoints.configurations.modules
        );
    }
}
