import { OC_SERVICE_CONFIG } from "./configure.js"

function debug(...args: any[]) {
    if (OC_SERVICE_CONFIG.debug) {
        console.log("AWS Services:")
        console.log("\t", ...args)
    }
}

export default debug
