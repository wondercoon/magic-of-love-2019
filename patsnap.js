const req = require('request');
const _ = require('lodash');


const getPatents = (query) => {
    const opt = {
        "_type": "query",
        "q": query,
        "withCount": true,
        "withKeywords": true
    };
    return new Promise((resolve, reject) => {
        req({
            uri: 'https://analytics.zhihuiya.com/srp/getPatents',
            method:'post',
            json: opt,
            headers: {
                cookie: process.env.COOKIE
            }
        }, (err, res) => {
            if (err) {
                return reject(err);
            } else {
                resolve(res.body);
            }
        })
    });
};

const getPatentData = async (query) => {
    const res = await getPatents(query);
    return _.get(res, 'data.patentData', []);
};

module.exports = {
    getPatents,
    getPatentData
};
