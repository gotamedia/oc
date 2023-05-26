import { logError } from "@gotamedia/utils"

import { OC_SERVICE_CONFIG } from "./configure.js"

const handleError = (error: Error, info?: any, forceThrow = false) => {
    if (OC_SERVICE_CONFIG.outputErrors) {
        logError(error, info)
    }

    if (OC_SERVICE_CONFIG.throwErrors || forceThrow) {
        throw error
    }
}

export default handleError
