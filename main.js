
var env = require('dotenv').config();
const fs = require('fs');
var bd = require('./baidu');
var ps = require('./patsnap');
var jd = require('./jd');
var _ = require('lodash');


(async () => {
    const res = await jd.search(fs.readFileSync("/tmp/lADPDgQ9q17VdGvNBQDNA8A_960_1280.jpg").toString("base64"));
    // const res = await bd.searchImg(fs.readFileSync("/tmp/sss/230.jpg").toString("base64"));
    
    const items = ps.getItems(res);
    console.log(items)
    const txt = ps.items2Text(_.take(items, 5)).join(',')
    console.log(txt);
    const nlpres = await bd.nlp(txt);
    console.log(nlpres);
    const arr = ps.nlp2kw(nlpres);
    console.log('result', arr);
    console.log(ps.getQueryByKw(arr));
    // const res = await ps.getPatentData('电风扇');
    // console.log(res)
})();

