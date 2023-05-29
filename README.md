# Gota Media OC

Set of OC helpers for NodeJs Runtime.

## Usage
```sh
npm install @gotamedia/oc
```

```ts
import { getLogs } from "@gotamedia/oc/services/Logs"

const handler = () => {
    const events = getLogs(123)
}
```

## Configure
In your lambda, import configure() from `@gotamedia/oc/configure` and make sure to call it bafore your handler

##### configure()
| property     | type    | default | required | description                                                                                    |
|--------------|---------|---------|----------|------------------------------------------------------------------------------------------------|
| debug        | boolean | false   |          | A debug flag, if set to true AWS Layer will start outputting helpful logs for all it's methods |
| throwErrors  | boolean | false   |          | Throw all caught errors from AWS SDK                                                           |
| outputErrors | boolean | true    |          | Output all caught errors from AWS SDK                                                          |
| baseUrl      | string  | null    |     x    | Base url for OC to be used                                                                     |
| username     | string  | null    |     x    | A valid username to be used for authorization                                                  |
| password     | string  | null    |     x    | A valid password to be used for authorization                                                  |

**Example:**
```ts
import configure from "@gotamedia/oc/configure"

configure({
    debug: true,
    outputErrors: true,
    throwErrors: true,
    baseUrl: "https://gota.oc.com",
    username: "admin",
    password: "admin"
})

const handler = async () => {
    ...
}
```

## Services
Available services:
* Logs
* Objects

### Logs

#### Available methods:

##### getLogs()
| param  | type      | default    | required | description       |
|--------|-----------|------------|----------|-------------------|
| first  | string    | undefined  |     x    | OC Event log ID   |
| second | LOG_TYPES | eventlog   |     x    | OC Event log type |

##### LOG_TYPES
* eventlog
* contentlog

**Example:**
```ts
import { getLogs } from "@gotamedia/oc/services/Logs"

const handler = async () => {
    const eventLogs = await getLogs(123, "eventlog")
}
```

### Objects

#### Available methods:

##### getObject()
| param  | type      | default    | required | description    |
|--------|-----------|------------|----------|----------------|
| first  | string    | undefined  |     x    | OC Object uuid |

**Example:**
```ts
import { getObject } from "@gotamedia/oc/services/Objects"

const handler = async () => {
    const object = await getObject("1234-4321-123-321-00-000")
}
```