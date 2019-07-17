const req = require('request');
const _ = require('lodash');
const md5 = require('md5');

const searchRaw = (imgBase64) => {
    return new Promise((resolve, reject) => {
        const ts = new Date().getTime();
        req({
            uri: 'https://aiapi.jd.com/jdai/snapshop',
            qs: {
                appkey: process.env.JD_APP_KEY,
                timestamp: ts,
                sign: md5(`${process.env.JD_APP_SEC}${ts}`)
            },
            method:'post',
            body: `channel_id=test&imgBase64=${imgBase64}`,
            headers: {
                cookie: process.env.COOKIE
            }
        }, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                try {
                    const result = JSON.parse(res.body);
                    resolve(result);
                } catch(e) {
                    reject(e);
                }
            }
        })
    });
};

const search = async (imgBase64) => {
    const res = await searchRaw(imgBase64);
    return _.get(res, 'result.dataValue', []);
}

module.exports = {
    searchRaw,
    search
};
