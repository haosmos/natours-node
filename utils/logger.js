const pino = require('pino-http');
const jsonColorizer = require('@pinojs/json-colorizer');
const pinoPretty = require('pino-pretty');
// const colorizeJSON = require('json-colorizer');

// function colorizeJSON(value) {
//   return jsonColorizer(value, { pretty: true });
// }

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname,req.headers.user-agent,req.headers.accept,req.headers.accept-encoding,req.headers.connection,req.remoteAddress,req.remotePort,res.headers.x-powered-by,res.headers.content-length",
      errorLikeObjectKeys: [ 'err', 'error' ], // --errorLikeObjectKeys
      errorProps: '', // --errorProps
      levelFirst: true, // --levelFirst
      messageKey: 'msg', // --messageKey
      levelKey: 'level', // --levelKey
      messageFormat: true, // --messageFormat
      timestampKey: 'time', // --timestampKey
      minimumLevel: "debug",
      customPrettifiers: {
        // request: colorizeJSON
      }
    }
  }
  
});

module.exports = logger;
