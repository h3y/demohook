'use strict';
const request = require('request-promise');
const ut = require('../helpers/http-utils');
const messages = require('elasticio-node').messages;

async function processAction(msg, cfg) {
    const self = this;
    try {

        let body = {
            "email": msg.body.email,
            "emailBlacklisted": msg.body.email_blacklisted,
            "smsBlacklisted": msg.body.sms_blacklisted,
            "listIds": [
                parseInt(cfg.list_id, 10)
            ]
        }
        if (msg.body.name || msg.body.firstname || msg.body.phone_number) {
            body["attributes"] = {
                "NAME": msg.body.name,
                "FIRSTNAME": msg.body.firstname,
                "SMS": msg.body.phone_number
            }
        }

        console.log("----------body----------\n" + JSON.stringify(body) + "\n----------body----------");
        let response = await request.post(await ut.buildRequest(self, cfg, `contacts`, body));
        console.log(JSON.stringify(response));
        response = await request.get(await ut.buildRequest(self, cfg, `contacts/${msg.body.email}`));
        self.emit('data', messages.newMessageWithBody(response));
    } catch (error) {
        console.log(`error           :${JSON.stringify(error.message)}`);
        if (error.statusCode == 400)
            self.emit('error', new Error(error.message));
        else if (error.statusCode == 404)
            self.emit('error', new Error('404 Not Found'));
        else if (error.statusCode == 401)
            self.emit('error', new Error('Unauthorized'));
        else if (error.statusCode == 429)
            self.emit('error', new Error('Too many requests'));
        else if (error.statusCode == 500)
            self.emit('error', new Error('Internal server error occurred'));
        else
            self.emit('error', new Error(error.message));
    } finally {
        self.emit('end');
    }
}

async function getContactListId(cfg) {
    const self = this;
    try {
        let response = await request.get(await ut.buildRequest(self, cfg, `contacts/lists`));
        console.log("----------response----------\n" + JSON.stringify(response) + "\n----------response----------");
        let model = {};
        for (let i = 0; i < response.lists.length; i++) {
            model[response.lists[i].id] = response.lists[i].name;
        }
        console.log("----------model----------\n" + JSON.stringify(model) + "\n----------model----------");
        return model;
    } catch (error) {
        console.log(`error           :${JSON.stringify(error)}`);
        throw new Error('SendInBlue respond with ' + JSON.stringify(error.message));
    }
}

exports.process = processAction;
exports.getContactListId = getContactListId;