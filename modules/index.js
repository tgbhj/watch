const fs = require('fs');

function randomWord(randomFlag, min, max) {
    let str = '';
    let range = min;
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let pos = 0;
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

function getDate(ctx) {
    let data = fs.readFileSync(process.cwd() + '/public/data.json');
    let str = data.toString();
    ctx.body = {
        all: JSON.parse(str).data,
        one: JSON.parse(str).data[0]
    };
}

function add(ctx) {
    let id = randomWord(true, 24, 24);
    let rtmp = 'rtmp://192.168.1.129:1935/live/' + ctx.request.body.code;
    let hls = 'http://192.168.1.129:1935/live/' + ctx.request.body.code + '/playlist.m3u8';
    let obj = {
        id: id,
        name: ctx.request.body.name,
        code: ctx.request.body.code,
        rtmp: rtmp,
        hls: hls
    };
    let data = fs.readFileSync(process.cwd() + '/public/data.json');
    let str = data.toString();
    str = JSON.parse(str);
    str.data.push(obj);
    str = JSON.stringify(str);
    fs.writeFileSync(process.cwd() + '/public/data.json', str);
    ctx.body = {
        code: 20000,
        msg: 'Success',
        cb: obj
    };
}

function del(ctx) {
    let data = fs.readFileSync(process.cwd() + '/public/data.json');
    let str = data.toString();
    str = JSON.parse(str);
    for (let [index, i] of str.data.entries()) {
        if (i.id === ctx.request.body.id) {
            str.data.splice(index, 1);
            ctx.body = {
                code: 20000,
                msg: 'Success',
                cb: str.data
            };
            str = JSON.stringify(str);
            fs.writeFileSync(process.cwd() + '/public/data.json', str);
        }
    }
}

function edit(ctx) {
    let data = fs.readFileSync(process.cwd() + '/public/data.json');
    let str = data.toString();
    str = JSON.parse(str);
    for (let [index, i] of str.data.entries()) {
        if (i.id === ctx.request.body.id) {
            str.data.splice(index, 1, {
                "id": i.id,
                "name": ctx.request.body.name,
                "code": ctx.request.body.code,
                "rtmp": "rtmp://192.168.1.129:1935/live/" + ctx.request.body.code,
                "hls": "http://192.168.1.129:1935/live/" + ctx.request.body.code + '/playlist.m3u8'
            });
            ctx.body = {
                code: 20000,
                msg: 'Success',
                cb: str.data
            };
            str = JSON.stringify(str);
            fs.writeFileSync(process.cwd() + '/public/data.json', str);
        }
    }
}

module.exports = {getDate, add, del, edit};