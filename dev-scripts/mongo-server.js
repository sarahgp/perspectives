var mongodbRest = require('mongodb-rest'),
    config      = { 
      "db": "mongodb://localhost:27017",
      "server": {
          "port": 3111,
          "address": "0.0.0.0"
      },
      "accessControl": {
          "allowOrigin": "*",
          "allowMethods": "GET,POST,PUT,DELETE,HEAD,OPTIONS",
          "allowCredentials": false
      },
      "mongoOptions": {
          "serverOptions": {
          },
          "dbOptions": {
              "w": 1
          }
      },
      "humanReadableOutput": true,
      "urlPrefix": ""
}


module.exports = mongodbRest.startServer(config);