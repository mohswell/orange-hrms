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



export const apiEndpoints: Record<string, any> = {
    users: '/admin/users',
    jobs: {
        jobTitles: '/admin/job-title',
        payGrades: '/admin/pay-grades',
        employmentStatus: '/admin/employment-statuses',
        jobCategories: '/admin/job-categories',
        workShifts: '/admin/work-shifts',
    },
    organization: {
        generalInformation: '/admin/organization',
        locations: '/admin/locations',
        structure: '/admin/subunits'
    },
    qualifications: {
        skills: '/admin/skills',
        education: '/admin/educations',
        licenses: '/admin/licenses',
        languages: '/admin/languages',
        memberships: '/admin/memberships',
    },
    nationalities: '/admin/nationalities',
    corporateBranding: '/admin/theme',
    configurations: {
        emailConfigurations: '/admin/email-configuration',
        emailSubscriptions: '/admin/email-subscription',
        languagePackages: '/admin/i18n/languages',
        localization: '/admin/localization',
        modules: '/admin/modules',
        socialMediaAuthentication: '/admin/openid-providers',
        registerOauthClient: '/admin/oauth-clients',
        ldapConfiguration: '/admin/ldap-config',
    },
}

const BASE = '/web/index.php';
const ADMIN = `${BASE}/admin`;
const PIM = `${BASE}/pim`;

export const uiPages: Record<string, any> = {
    home: `${BASE}/dashboard/index`,
    admin: {
        users: {
            view: `${ADMIN}/viewSystemUsers`,
            create: `${ADMIN}/saveSystemUser`,
        },
        jobs: {
            jobTitles: `${ADMIN}/viewJobTitleList`,
            payGrades: `${ADMIN}/viewPayGrades`,
            employmentStatuses: `${ADMIN}/employmentStatus`,
            jobCategories: `${ADMIN}/jobCategory`,
            workShifts: `${ADMIN}/workShift`,
        },
        organization: {
            generalInformation: `${ADMIN}/viewOrganizationGeneralInformation`,
            locations: `${ADMIN}/viewLocations`,
            structure: `${ADMIN}/viewCompanyStructure`,
        },
        qualifications: {
            skills: `${ADMIN}/viewSkills`,
            education: `${ADMIN}/viewEducation`,
            licenses: `${ADMIN}/viewLicenses`,
            languages: `${ADMIN}/viewLanguages`,
            memberships: `${ADMIN}/membership`,
        },
        nationalities: `${ADMIN}/nationality`,
        corporateBranding: `${ADMIN}/addTheme`,
        configurations: {
            emailConfigurations: `${ADMIN}/listMailConfiguration`,
            emailSubscriptions: `${ADMIN}/viewEmailNotification`,
            localization: `${ADMIN}/localization`,
            languagePackages: `${ADMIN}/languagePackage`,
            modules: `${ADMIN}/viewModules`,
            socialMediaAuthentication: `${ADMIN}/openIdProvider`,
            registerOauthClient: `${ADMIN}/registerOAuthClient`,
            ldapProvider: `${ADMIN}/ldapConfiguration`,
        },
    },
    pim: {
        employeeList: `${PIM}/viewEmployeeList`,
        addEmployee: `${PIM}/addEmployee`,
        employeeReports: `${PIM}/viewDefinedPredefinedReports`,
        addEmployeeReport: `${PIM}/definePredefinedReport`,
        configuration: {
            optionalFields: `${PIM}/configurePim`,
            customFields: `${PIM}/listCustomFields`,
            addCustomField: `${PIM}/saveCustomFields`,
            dataImport: `${PIM}/pimCsvImport`,
            reportingMethods: `${PIM}/viewReportingMethods`,
            addReportingMethod: `${PIM}/saveReportingMethod`,
            terminationReasons: `${PIM}/viewTerminationReasons`,
            addTerminationReason: `${PIM}/saveTerminationReasons`
        },
    }
};