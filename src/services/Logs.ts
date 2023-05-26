import debug from "../debug.js"
import handleError from "../handleError.js"

import { OC_SERVICE_CONFIG } from "../configure.js"

export type Log = {
    Event: 'eventlog',
    Content: 'contentlog'
}

const LOG_TYPES = {
    Event: 'eventlog',
    Content: 'contentlog'
}

const getLogs = async (id: string, type: Log) => {
    const {
        baseUrl,
        username,
        password
    } = OC_SERVICE_CONFIG

    if (!baseUrl || !username || !password) {
        handleError(
            new Error("Missing required params for OC service, make sure to pass valid: 'baseUrl', 'username' and 'password'"),
            {
                params: {
                    baseUrl: baseUrl,
                    username: username,
                    password: password
                }
            },
            true
        )

        return
    }

    if (!type) {
        handleError(
            new Error("Missing required type for OC service, make sure to pass valid type: 'eventlog' OR 'contentlog'"),
            {
                params: {
                    baseUrl: baseUrl,
                    username: username,
                    password: password
                }
            },
            true
        )

        return
    }

    debug(`Get OC logs with ID: ${id} / TYPE: ${type}`)

    try {
        const requestUrl = `${baseUrl}/${type}?event=${id}`
        
        const credentials = Buffer.from(`${username}:${password}`).toString("base64")
        const requestOptions = {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        }

        debug("Fetching OC logs from: ", requestUrl)
    
        const response = await fetch(requestUrl, requestOptions)
    
        const { events } = await response.json()
    
        if (!Array.isArray(events) || !events.length) {
            debug("Received invalid events from OC logs: ", events)

            return
        }

        debug(`Received ${events.length} event/s from OC logs`)

        return events
    } catch (error) {
        handleError(error as Error, "Something went wrong while fetching logs from OC")

        return
    }
}

export {
    getLogs,
    LOG_TYPES
}
