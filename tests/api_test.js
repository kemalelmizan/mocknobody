module.exports = {
  "routes": [
    {
      "method": "GET",
      "url": "/ping",
      "response": "pong",
    },
    {
      "method": "POST",
      "url": "/test-object",
      "response": { "key": "value" },
    },
    {
      "method": "PUT",
      "url": "/test-object-with-headers",
      "response": { "key": "value" },
      "headers": { "content-type": "application/jsonx", "x-test": "123" },
    },
    {
      "method": "PATCH",
      "url": "/test-patch",
      "response": { "key": "value" },
      "headers": { "content-type": "application/jsonx", "x-test": "123" },
    },
    {
      "method": "DELETE",
      "url": "/test-delete",
      "response": { "key": "value" },
      "headers": { "content-type": "application/jsonx", "x-test": "123" },
    },
  ],
  "not_found": {
    "response": "not found",
  },
}