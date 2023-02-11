export enum HttpCode {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    FORBIDDEN = 403
}

export interface CustomErrorArgs {
    message: string;
    httpCode: HttpCode;
}

class CustomError extends Error {
    public readonly httpCode: HttpCode;


    constructor({ message, httpCode }: CustomErrorArgs) {
        super(message);
        this.httpCode = httpCode;
    }
}

export default CustomError