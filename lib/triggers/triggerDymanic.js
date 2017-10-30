'use strict';
const messages = require('elasticio-node').messages;
const request = require('request-promise');

async function processTrigger(msg = {}, cfg) {
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

function getMetaModel(cfg) {
    return {
        out: {
            "type": "object",
            "properties": {
                "email": "demo@email.com",
                "event": "\"elastic event\"",
                "list_id": "555888",
                "list_id2": "77777",
            }
        }
    };
}

exports.process = processTrigger;
exports.getMetaModel = getMetaModel;