// export const BACKEND_API_URL = "/api";
// export const BACKEND_API_URL = "http://localhost/api";

const PROD_API_URL = 'https://www.onlyhater.com/api';
const DEV_API_URL = "http://localhost/api";

export const BACKEND_API_URL = process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL;

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const ERROR_MESSAGE = "An error has occured!";
export const SEVERITY_SUCCESS = "success";
export const SEVERITY_ERROR = "error";