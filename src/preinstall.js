#!/usr/bin/env node

const fs = require("fs");
const https = require('https');
const homedir = require('os').homedir();
const dir = `${homedir}/.mocknobody`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const file = fs.createWriteStream(`${dir}/mocknobody.js`);
const request = https.get("https://raw.githubusercontent.com/kemalelmizan/mocknobody/master/src/mocknobody.js",
  (response) => {
    response.pipe(file);
  });
file.on('finish', () => file.close());

request.on('error', (err) => {
  fs.unlink(dest);
  throw err;
});

file.on('error', (err) => {
  fs.unlink(`${dir}/mocknobody.js`);
  throw err;
});
