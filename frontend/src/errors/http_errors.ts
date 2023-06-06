class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Startus code: 401 
 */
export class UnauthorizedError extends HttpError { };

/**
 * Status code: 409
 */
export class ConflictError extends HttpError { };