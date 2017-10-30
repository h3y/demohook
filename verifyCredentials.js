'use strict';
const request = require('request-promise');
const co = require('co');
const ut = require('./lib/helpers/http-utils');

module.exports = function verifyCredentials(credentials, cb) {
    co(function*() {
        return cb(null, { verified: true });
    });
};