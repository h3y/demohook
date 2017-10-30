'use strict';
const messages = require('elasticio-node').messages;
const request = require('request-promise');
const ut = require('../helpers/http-utils');

async function startup(cfg) {
    const body = {
        uri: "https://requestb.in/upfdljup",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "cfg": cfg,
            "status": "hook started"
        }
    }
    let response = await request.post(body);
    return response;
}

async function processTrigger(msg = {}, cfg) {
    const self = this;
    try {
        const body = {
            uri: "https://requestb.in/upfdljup",
            json: true,
            headers: {
                "Content-Type": "application/json",
                "msg.body": msg.body,
                "cfg": cfg
            }
        }
        let response = await request.post(body);

        console.log("msg.body:  " + JSON.stringify(msg.body));
        console.log("cfg:  " + JSON.stringify(cfg));
        console.log("response:  " + JSON.stringify(response));

        self.emit('data', messages.newMessageWithBody(response));
    } catch (error) {
        console.log(`error           :${JSON.stringify(error.message)}`);
        self.emit('error', new Error(error.message));
    } finally {
        self.emit('end');
    }
}

function getMetaModel(cfg) {
    return {
        in: {},
        out: {
            "type": "object",
            "properties": {
                "email": "demo@email.com",
                "event": "elastic event",
                "list_id": "555888"
            }
        }
    };
}

exports.process = processTrigger;
exports.startup = startup;
exports.getMetaModel = getMetaModel;