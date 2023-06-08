export type OC_SERVICE_CONFIG_Type = {
    baseUrl: string,
    username: string,
    password: string
}

let OC_SERVICE_CONFIG: OC_SERVICE_CONFIG_Type = {
    baseUrl: "",
    username: "",
    password: ""
}

const configure = (config: OC_SERVICE_CONFIG_Type) => {
    OC_SERVICE_CONFIG = {
        ...OC_SERVICE_CONFIG,
        ...config
    }
}

export {
    OC_SERVICE_CONFIG,
    configure
}
