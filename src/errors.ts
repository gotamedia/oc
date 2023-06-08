export type OC_ERROR_OPTIONS = {
    cause: Error,
}

class OCError extends Error {
    constructor(message: string, options?: OC_ERROR_OPTIONS) {
        super(message, options)
        this.name = this.constructor.name
    }
}

class LogsError extends OCError {}
class ObjectsError extends OCError {}

export {
    OCError,
    LogsError,
    ObjectsError,
}
