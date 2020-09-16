# mocknobody
[![npm version](https://badge.fury.io/js/mocknobody.svg)](https://badge.fury.io/js/mocknobody) [![Dependencies](https://david-dm.org/kemalelmizan/mocknobody.svg)](https://david-dm.org/kemalelmizan/mocknobody.svg) [![Known Vulnerabilities](https://snyk.io/test/github/kemalelmizan/mocknobody/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kemalelmizan/mocknobody?targetFile=package.json)

Creates api server in your local machine with 1 file route configuration.
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
(if the command `mocknobody` is too long, you can add `alias mock=mocknobody` on your .bashrc or .zshrc file and use `mock` instead.)

## `api.js` structure
`api.js` has this structure:
```
module.exports = {
  "routes": [
    {
      "method": "GET",
      "url": "/ping",
      "status": 200,
      "response": "pong",
      "headers": { 
        "content-type": "application/json",
        "x-test": "123"
      },
    },
  ],
  "not_found": {
    "response": "not found",
  },
}
```
- `routes`: array of route on your API, defined by these values:
  - `method`: case-insensitive [http methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Currently supports `get`, `post`, `put`, `patch` and `delete`.
  - `url`: relative url of your API. You can use same URL with different param queries in different routes.
  - `status`: integer of [HTTP Response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - `response` : can be string or a javascript object (will be returned JSON as default)
  - `headers` : object of additional [response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) you want to send. you can override existing response header or create new one.
- `not_found`: default response if the route is not found

You can check out `tests/api_test.js` for more examples.

Since `api.js` is imported just like normal javascript file by the server, you can add any logic on the file as you want. As long as the format exported is still the same as defined above, `mocknobody` will be able to parse them.

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

## Running on Development mode
```
DEV=true ./src/wrapper.js
```
this will run `mocknobody.js` in src, as well as adding it and `wrapper.js` to file watch list.

## Design decisions
 - why use `api.js` and not `api.json`?
    - In addition to enable you to be flexible with your logic by having javascript file instead of just json file, this will also enable you to comment out any routes/responses/anything while you develop your frontend. This is a tool for mocking APIs after all.

## License
MIT
