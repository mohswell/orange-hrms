export interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
    url?: string;
}

export interface LocalStorageEntry {
    name: string;
    value: string;
}

export interface Origin {
    origin: string;
    localStorage: LocalStorageEntry[];
}

export interface StorageState {
    cookies: Cookie[];
    origins: Origin[];
}

export interface ApiResponse<T> {
    status: number;
    ok: boolean;
    body: T | any;
}

export interface ApiErrorResponse {
    errors: Record<string, string[]>;
}

export interface Modules {
    admin: boolean;
    pim: boolean;
    leave: boolean;
    time: boolean;
    recruitment: boolean;
    performance: boolean;
    maintenance: boolean;
    mobile: boolean;
    directory: boolean;
    claim: boolean;
    buzz: boolean;
}

export type ModulesAPIResponse = {
    data: Modules;
    meta: string[];
    rels: string[];
};

export interface Localization {
    language: string;
    dateFormat: string;
}
export type localizationAPIResponse = {
    data: Localization;
    meta: string[];
    rels: string[];
}