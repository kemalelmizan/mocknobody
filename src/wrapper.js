#!/usr/bin/env node
"use strict";

const fs = require("fs");
const homedir = require('os').homedir();
const { exec } = require('child_process');
const nodemon = require('nodemon');

const api_js_dir = `${homedir}/.mocknobody`
const api_js_file = process.env.API_JS || `${api_js_dir}/api.js`;

if (process.argv.includes("-c") || process.argv.includes("--config")) {
  // if file does not exist, create it. otherwise, open it
  if (fs.existsSync(api_js_file)) {
    console.log(`Opening ${api_js_file} for configuration...`);
    exec('${EDITOR:-${VISUAL:-code}} ' + api_js_file)
  } else {
    if (!fs.existsSync(api_js_dir)) {
      fs.mkdirSync(api_js_dir);
    }
    const data = `module.exports = {
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
}`;
    try {
      fs.writeFileSync(api_js_file, data, 'utf8');
    } catch (err) {
      console.log(`Error creating ${api_js_file}: ${err.message}`)
    }
    console.log(`API file has been saved! Opening ${api_js_file} for configuration...`);
    exec('${EDITOR:-${VISUAL:-code}} ' + api_js_file)
  }
  process.exit();
}

nodemon({
  exec: "mocknobody-js",
  "watch": [
    api_js_file,
  ],
  "env": {
    "NODE_ENV": "development",
    "PORT": process.env.PORT,
    "API_JS": api_js_file,
  },
  "ext": "js,json"
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('crash', (code) => {
  nodemon.emit('quit');
  process.exit(code);
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});
