'use strict';
const messages = require('elasticio-node').messages;
const request = require('request-promise');

async function processTrigger(msg = {},cfg) {
    const self = this;
    try {
        console.log("msg.body:  "+JSON.stringify(msg.body));
        console.log("cfg:  "+JSON.stringify(cfg));
        self.emit('data', messages.newMessageWithBody(msg.body));
    } catch (error) {
        console.log(`error           :${JSON.stringify(error.message)}`);
        self.emit('error', new Error(error.message));
    } finally {
        self.emit('end');
    }
}

exports.process = processTrigger;
