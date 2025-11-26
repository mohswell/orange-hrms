import { APIRequestContext } from '@playwright/test';
import { HEADER, httpMethods } from '@/types/constants';
import { getCookies } from '@/helpers/utils';
import { ApiResponse } from '@/types/api-schemas';
import { RequestLogger } from '@/helpers/logger';

export class APIClient {
    constructor(private request: APIRequestContext, private baseUrl: string) { }

    private buildHeaders(extra?: Record<string, string>) {
        const headers: Record<string, string> = {
            'Content-Type': HEADER.CONTENT_TYPE,
            ...extra,
        };

        const cookie = getCookies(this.baseUrl);
        if (cookie) headers.Cookie = cookie;

        return headers;
    }

    private async handleResponse<T>(response: any): Promise<ApiResponse<T>> {
        let body: T = {} as T;
        try {
            body = await response.json();
        } catch {
            console.log('Failed to parse JSON response');
        }

        RequestLogger.logResponse(response.status(), body);

        return {
            status: response.status(),
            ok: response.ok(),
            body,
        };
    }

    async get<T>(url: string, params?: Record<string, any>) {
        RequestLogger.logRequest(httpMethods.get, `${this.baseUrl}${url}`, params);
        const res = await this.request.get(`${this.baseUrl}${url}`, {
            headers: this.buildHeaders(),
            params,
        });
        return this.handleResponse<T>(res);
    }

    async post<T, B = any>(url: string, body?: B) {
        RequestLogger.logRequest(httpMethods.post, `${this.baseUrl}${url}`, body);
        const res = await this.request.post(`${this.baseUrl}${url}`, {
            headers: this.buildHeaders(),
            data: body,
        });
        return this.handleResponse<T>(res);
    }

    async put<T, B = any>(url: string, body?: B) {
        RequestLogger.logRequest(httpMethods.put, `${this.baseUrl}${url}`, body);
        const res = await this.request.put(`${this.baseUrl}${url}`, {
            headers: this.buildHeaders(),
            data: body,
        });
        return this.handleResponse<T>(res);
    }

    async delete<T>(url: string) {
        RequestLogger.logRequest(httpMethods.delete, `${this.baseUrl}${url}`);
        const res = await this.request.delete(`${this.baseUrl}${url}`, {
            headers: this.buildHeaders(),
        });
        return this.handleResponse<T>(res);
    }
}
