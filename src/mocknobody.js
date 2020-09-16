#!/usr/bin/env node
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.PORT = process.env.PORT || 3000;
const api_js_file = process.env.API_JS;

let api;
try {
  api = require(api_js_file);
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND" || e.code === "ERR_INVALID_ARG_TYPE") {
    console.error(`${api_js_file} not found. Try running "mocknobody -c" first`);
    process.exit(1);
  } else {
    console.error(e);
    process.exit(1);
  }
}

const handle = (route) => (req, res) => {
  console.log(
    `${new Date()} - Incoming req: ${req.method} - ${req.url} from ${req.ip
    } - ${JSON.stringify(req.body)}`
  );

  console.log(
    `${new Date()} - Responding ${req.method} - ${req.url} from ${req.ip} - ${JSON.stringify(
      route.response
    )}`
  );

  // handle param queries
  if (route.url !== req.url) route = api.routes.find(r => r.url === req.url);

  let status = 200;
  if (route.status) status = route.status;

  if (typeof route.response === "object") res.header("Content-Type", "application/json");
  if (route.headers && Object.keys(route.headers).length > 0) {
    Object.keys(route.headers).map((headerKey) => {
      res.header(headerKey, route.headers[headerKey]);
    })
  }

  res.status(status);
  return res.send(route.response);
}

api.routes.map((route) => {
  switch (route.method.toLowerCase()) {
    case "get":
      app.get(route.url, handle(route));
      break;
    case "post":
      app.post(route.url, handle(route));
      break;
    case "put":
      app.put(route.url, handle(route));
      break;
    case "patch":
      app.patch(route.url, handle(route));
      break;
    case "delete":
      app.delete(route.url, handle(route));
      break;
  }
})

app.all("*", (req, res) => {
  console.log(
    `${new Date()} - Incoming req: ${req.method} - ${req.url} from ${req.ip
    } - ${JSON.stringify(req.body)}`
  );
  console.log("Invalid route");

  if (typeof api.not_found.response === "object") res.header("Content-Type", "application/json");
  res.status(404)
    .send(api.not_found.response);
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`${new Date()} - mock started\nenv:\n\tPORT=${process.env.PORT}\n\tAPI_JS=${api_js_file}\nAvailable APIs: \n`
    + api.routes
      .map(route => `\t${route.method} - ${route.url}`)
      .join("\n"))
});

const shutdown = () => {
  console.log('shutdown signal received: closing mock server');
  server.close(() => {
    console.log('server closed');
    process.exit();
  })
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = server
