import { ObjectsError } from "../errors"
import { OC_SERVICE_CONFIG } from "../configure.js"

const getObject = async (uuid: string) => {
    const {
        baseUrl,
        username,
        password
    } = OC_SERVICE_CONFIG

    if (!uuid) {
        throw new ObjectsError("Missing required uuid for OC service, make sure to pass object uuid")
    }

    try {
        const requestUrl = `${baseUrl}/objects/${uuid}`

        const credentials = Buffer.from(`${username}:${password}`).toString("base64")
        const requestOptions = {
            headers: {
                Authorization: `Basic ${credentials}`
            }
        }

        const response = await fetch(requestUrl, requestOptions)

        if (!response.ok) {
            throw new ObjectsError(`Could not fetch object ${uuid} from OpenContent`)
        }

        const data = await response.text()

        return data
    } catch (error) {
        throw new ObjectsError(`Something went wrong while fetching object ${uuid} from OC`, {
            cause: error as Error
        })
    }
}

export {
    getObject
}
