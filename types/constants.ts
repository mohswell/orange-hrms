import { ApiErrorResponse, ApiResponse } from "./api-schemas";

export const DEFAULT_PROFILE_IMAGE_URL =
    "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg";


export const HEADER = {
    CONTENT_TYPE: "application/json",
};


export const STORAGE_PATH = ".auth/userSession.json";

export const AUTH_TOKEN_PATH = ".auth/authToken";


export function isError<T extends object>(
    res: ApiResponse<T>
): res is ApiResponse<ApiErrorResponse> {
    return 'errors' in res.body;
}

export function isSuccess<T extends object>(
    res: ApiResponse<T>
): res is ApiResponse<T> {
    return !('errors' in res.body);
}


export const httpStatusCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
};

export const httpMethods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    patch: 'PATCH',
}; 



export const apiEndpoints = {
    configurations: {
        localization: '/admin/localization',
        modules: '/admin/modules',
    },
}