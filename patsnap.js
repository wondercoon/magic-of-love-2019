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

const nlp2kw = (res) => {
    const arr = _.get(res, 'items', []);
    console.log('raw', _.map(arr, 'item'));
    let wordArr = _.reject(arr, i => ['w', 'nt'].includes(i.pos));
    console.log('filter 1', _.map(wordArr, 'item'));

    const g = _.groupBy(wordArr, i => i.item);
    const types = _.partition(wordArr, i => i.ne === 'ORG' || i.pos === 'nz');
    console.log('filter 2', _.map(types[0], 'item'), _.map(types[1], 'item'));
    
    // const orgs = _.map(types[0], 'item');
    // let others = _.uniq(_.map(types[1], 'item'));
    let orgArr = _.chain(types[0]).groupBy('item').mapValues(i=>i.length).map((v, k) => ({k, v})).orderBy(['v'], ['desc']).map('k').value();
    let keyArr = _.chain(types[1]).groupBy('item').mapValues(i=>i.length).map((v, k) => ({k, v})).orderBy(['v'], ['desc']).map('k').value();

    // others = _.take(_.reject(others, i => i.length < 2 || i.length > 7), 7)
    // console.log('final', orgs, others);
    return {
        orgs: orgArr, 
        keys: keyArr
    };
}

const getQueryByKw = (res) => {
    let q = [];
    if (res.orgs || res.orgs.length > 0) {
        q.push(`anc: ${res.orgs[0]}`);
    }
    if (res.keys || res.keys.length > 0) {
        const qKey = _.take(_.pull(res.keys, '系统'), 7).join(' OR ');
        q.push(`(${qKey})`);
    }
    return q.join(' AND ');
}

const getItems = (res) => {
    if (!res) return [];
    const items = _.get(res[0], 'sims', []);
    return items;
};

const items2Text = (items) => {
    return _.map(items, 'skuName');
}

module.exports = {
    getPatents,
    getPatentData,
    nlp2kw,
    getItems,
    items2Text,
    getQueryByKw
};
