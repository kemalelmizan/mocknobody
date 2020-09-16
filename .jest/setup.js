const net = require('net');

// random ephemeral port
process.env.PORT = Math.floor(Math.random() * (65535 - 49152) + 49152)
process.env.API_JS = "../tests/api_test.js";
