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

        return await response.text()
    } catch (error) {
        throw new ObjectsError(`Something went wrong while fetching object ${uuid} from OC`, {
            cause: error as Error
        })
    }
}

const getImage = async (uuid: string) => {
    const {
        baseUrl,
        username,
        password
    } = OC_SERVICE_CONFIG

    if (!uuid) {
        throw new ObjectsError("Missing required uuid for OC service, make sure to pass image uuid")
    }

    try {
        const requestParams = {
            headers: {
                Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
            }
        };
        const filesResponse = await fetch(`${baseUrl}/objects/${uuid}/files`, requestParams)

        if (!filesResponse.ok) {
            throw new ObjectsError(`Could not fetch image-files ${uuid} from OpenContent`)
        }

        const files = await filesResponse.json()
        const primaryFile = files["metadata"][0]["filename"] ?? "";
        if (primaryFile === "") {
            throw new ObjectsError(
                `Cannot determine primary filename when fetching image xml for ${uuid} from OpenContent`
            )
        }

        const imageXmlResponse = await fetch(`${baseUrl}/objects/${uuid}/files/${primaryFile}`, requestParams)

        if (!imageXmlResponse.ok) {
            throw new ObjectsError(`Could not fetch image-xml ${uuid}/files/${primaryFile} from OpenContent`)
        }

        return await imageXmlResponse.text()
    } catch (error) {
        throw new ObjectsError(`Something went wrong while fetching image ${uuid} from OC`, {
            cause: error as Error
        })
    }
}

export {
    getObject,
    getImage
}
