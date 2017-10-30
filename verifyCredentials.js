'use strict';
const request = require('request-promise');
const co = require('co');

module.exports = function verifyCredentials(credentials, cb) {
    co(function*() {
        return cb(null, { verified: true });
    });
};