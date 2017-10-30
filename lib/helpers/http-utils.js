'use strict';

const request = require('request-promise');

function returnRequest(cfg, uri, requestParam) {

    let url = `https://api.sendinblue.com/v3/${uri}`;
    if (requestParam)
        url = url + `?${requestParam}`;
    console.log(`uri         ${url}`);
    return {
        uri: url,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'api-key': `${cfg.apiKey}`
        }
    };
}


exports.buildRequest = async function(self, cfg, uri, body, requestParam) {
    console.log("cfg: " + JSON.stringify(cfg));
    // cfg.oauth.access_token = await refreshToken(cfg, self);
    const res = returnRequest(cfg, uri, requestParam);
    if (body)
        res.body = body;
    return res;
};


// async function refreshToken(config, component) {

//     let options = {
//         method: 'POST',
//         uri: `https://api.capsulecrm.com/oauth/token`,
//         json: true,
//         form: {
//             refresh_token: config.oauth.refresh_token,
//             format: "json",
//             grant_type: 'refresh_token',
//             client_id: config.clientId,
//             client_secret: config.clientSecret
//         },
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };

//     function emitUpdateKeys(responseBody) {
//         if (component) {
//             console.log('Updating token');
//             component.emit('updateKeys',
//                 {
//                     oauth: responseBody
//                 });
//             component.emit('end');
//         }
//         return responseBody;
//     }

//     function getToken(responseBody) {
//         return responseBody.access_token;
//     }
//     let token = await request(options).then(emitUpdateKeys).then(getToken);
//     return token;
// };