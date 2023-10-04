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
| baseUrl      | string  | null    |     x    | Base url for OC to be used                                                                     |
| username     | string  | null    |     x    | A valid username to be used for authorization                                                  |
| password     | string  | null    |     x    | A valid password to be used for authorization                                                  |

**Example:**
```ts
import configure from "@gotamedia/oc/configure"

configure({
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
* Images

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

### Images

#### Available methods:

##### getImage()
| param  | type      | default    | required | description   |
|--------|-----------|------------|----------|---------------|
| first  | string    | undefined  |     x    | OC Image uuid |

**Example:**
```ts
import { getImage } from "@gotamedia/oc/services/Objects"

const handler = async () => {
    const imageXml = await getImage("1234-4321-123-321-00-000")
}
```

## Contributing

### Trunk based development
This project uses a [trunk based development](https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development) workflow.

> **_NOTE:_**  `master` is the trunk branch

### Conventional commits

This project works with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Contribute
* Pull latest from develop.
* Branch out a new branch.
* Commit and push your awesome code.
* Open a pull request so we can approve your awesome code.

## Publish
Any time you push to origin master branch, a pipeline will be automatically triggered and it will build the package for you.
The pipeline will bump the version for you automatically and tag the package.

> **_NOTE:_**  NO MANUAL TAGGING

Then it will generate and update the CHANGELOG depends on your pushed commits.

## License

MIT