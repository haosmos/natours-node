const pino = require('pino');
const pinoHttp = require('pino-http');
// const jsonColorizer = require('@pinojs/json-colorizer');
const pinoPretty = require('pino-pretty');
// const colorizeJSON = require('json-colorizer');

// function colorizeJSON(value) {
//   return jsonColorizer(value, { pretty: true });
// }

// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//       translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
//       ignore:
// "pid,hostname,req.headers.user-agent,req.headers.accept,req.headers.accept-encoding,req.headers.connection,req.remoteAddress,req.remotePort,res.headers.x-powered-by,res.headers.content-length",
// errorLikeObjectKeys: [ 'err', 'error' ], // --errorLikeObjectKeys
// errorProps: '', // --errorProps levelFirst: true, // --levelFirst
// messageKey: 'msg', // --messageKey levelKey: 'level', // --levelKey
// messageFormat: true, // --messageFormat timestampKey: 'time', //
// --timestampKey minimumLevel: "debug", customPrettifiers: { // request:
// colorizeJSON } } }  });

// TODO Refactor logger
// let transport
// if (process.env.NODE_ENV !== 'production') {
//   transport = {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//       ignore: 'pid,hostname',
//       translateTime: true,
//     },
//     messageFormat: '{levelLabel} - {pid} - url:{req.url}',
//   }
// }
// export const pinoLogger = pino({
//   transport: transport,
// })
//
// export const httpLogger = pinoHttp({
//   logger: pinoLogger,
//   // Define a custom request id function
//   genReqId: function (req) {
//     return req.id
//   },
//
//   customLogLevel: function (req, res, err) {
//     if (res.statusCode >= 400 && res.statusCode < 500) {
//       return 'warn'
//     } else if (res.statusCode >= 500 || err) {
//       return 'error'
//     } else if (res.statusCode >= 300 && res.statusCode < 400) {
//       return 'silent'
//     }
//     return 'info'
//   },
//
//   // Define a custom success message
//   customSuccessMessage: function (req, res) {
//     if (res.statusCode === 404) {
//       return 'resource not found'
//     }
//     return `${req.method} completed`
//   },
//
//   // Define a custom receive message
//   customReceivedMessage: function (req, res) {
//     return 'request received: ' + req.method
//   },
//
//   // Define a custom error message
//   customErrorMessage: function (req, res, err) {
//     return 'request errored with status code: ' + res.statusCode
//   },
//
//   // Override attribute keys for the log object
//   customAttributeKeys: {
//     req: 'request',
//     res: 'response',
//     err: 'error',
//     responseTime: 'timeTaken',
//   },
// })

module.exports = logger;
