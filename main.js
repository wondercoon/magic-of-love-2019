
var env = require('dotenv').config();
const fs = require('fs');
var bd = require('./baidu');
var ps = require('./patsnap');


(async () => {
    // const res = await bd.searchImg(fs.readFileSync("/tmp/sss/230.jpg").toString("base64"));
    // console.log(res)
    // return;
    const res = await ps.getPatentData('电风扇');
    console.log(res)
})();

