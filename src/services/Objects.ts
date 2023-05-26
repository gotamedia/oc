import debug from "../debug.js"
import handleError from "../handleError.js"

import { OC_SERVICE_CONFIG } from "../configure.js"

const getObject = async (uuid: string) => {
    const {
        baseUrl,
        username,
        password
    } = OC_SERVICE_CONFIG

    if (!uuid) {
        handleError(
            new Error("Missing required uuid for OC service, make sure to pass object uuid"),
            {
                params: {
                    uuid: uuid
                }
            },
            true
        )

        return
    }

    debug(`Get OC object with UUID: ${uuid}`)

    try {
        const requestUrl = `${baseUrl}/objects/${uuid}`
        
        const credentials = Buffer.from(`${username}:${password}`).toString("base64")
        const requestOptions = {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        }

        debug("Fetching OC object from: ", requestUrl)
    
        const response = await fetch(requestUrl, requestOptions)

        if (!response.ok) {
            handleError(
                new Error("Something went wrong while fetching object from OC"),
                `Could not fetch object ${uuid} from OpenContent`
            )

            return
        }
    
        const data = await response.text()

        return data
    } catch (error) {
        handleError(error as Error, `Something went wrong while fetching object ${uuid} from OC`)

        return
    }
}

export {
    getObject
}
