import { LogsError } from "../errors"
import { OC_SERVICE_CONFIG } from "../configure.js"

export type Log = {
    Event: "eventlog",
    Content: "contentlog"
}

const LOG_TYPES = {
    Event: "eventlog",
    Content: "contentlog"
}

const getLogs = async (id: string, type: Log) => {
    const {
        baseUrl,
        username,
        password
    } = OC_SERVICE_CONFIG

    if (!baseUrl || !username || !password) {
        throw new LogsError(
            "Missing required params for OC service, make sure to pass valid: 'baseUrl', 'username' and 'password'"
        )
    }

    if (!type) {
        throw new LogsError(
            "Missing required type for OC service, make sure to pass valid type: 'eventlog' OR 'contentlog'"
        )
    }

    try {
        const requestUrl = `${baseUrl}/${type}?event=${id}`

        const credentials = Buffer.from(`${username}:${password}`).toString("base64")
        const requestOptions = {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        }

        const response = await fetch(requestUrl, requestOptions)

        const { events } = await response.json()

        if (!Array.isArray(events) || !events.length) {
            return
        }

        return events
    } catch (error) {
        throw new LogsError("Something went wrong while fetching logs from OC", { cause: error as Error })
    }
}

export {
    getLogs,
    LOG_TYPES
}
