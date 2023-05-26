export type OC_SERVICE_CONFIG_Type = {
    debug?: boolean,
    throwErrors?: boolean,
    outputErrors?: boolean,
    baseUrl: string,
    username: string,
    password: string
}

let OC_SERVICE_CONFIG: OC_SERVICE_CONFIG_Type = {
    debug: false,
    throwErrors: false,
    outputErrors: true,
    baseUrl: '',
    username: '',
    password: ''
}

const configure = (config: OC_SERVICE_CONFIG_Type) => {
    OC_SERVICE_CONFIG = {
        ...OC_SERVICE_CONFIG,
        ...config
    }
}

export {
    OC_SERVICE_CONFIG,
    configure as default
}
