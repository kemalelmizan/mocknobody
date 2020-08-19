# mocknobody

Creating api server in your local machine with 1 file route configuration.
Live-reloads the mock server if API config changes.
Does not do any process on request body (hence `mocknobody`).

## Installation
```
npm i -g mocknobody
```

## Creating API file

```
mocknobody -c
```

This will create `api.js` file, located by default in `$HOME/.mocknobody/api.js`.
If you prefer to use your own `api.js` file, you can override this location by adding `API_JS` env variable e.g. `API_JS=/var/mock/api.js mocknobody`.
`api.js` sample can be seen on `api_sample.js`.


## Basic Usage

To start your mock server:
```
mocknobody
```
In separate terminal, you can try this example request
```
curl localhost:3000/ping
```

## `api.js` structure
`api.js` has this structure:
```
module.exports = {
  "routes": [
    {
      "method": "GET",
      "url": "/ping",
      "response": "pong",
    },
  ],
  "not_found": {
    "response": "not found",
  },
}
```
- Put all your `routes` in `routes` with 3 values:
  - `method`: Case-insensitive [http methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Currently supports `get`, `post`, `put`, `patch` and `delete`.
  - `url`: relative url of your API.
  - `response` : can be string or a javascript object (will be returned JSON as default)
- `not_found`: default response if the route is not found

## Configurations
All these options can be configured through environment variables

| Property | Description | Default value |
|-|-|-|
| `PORT` | Port to serve the mock server | 3000 |
| `API_JS` | Overriding `API_JS` file with your own file | `$HOME/.mocknobody/api.js` |

Example usage with config:
```
PORT=3001 API_JS=/var/mock/api.js mocknobody
```

## License
MIT

## Todos

1. [ ] add tests
1. [ ] add delays (similar to mocklocal)

