const http = require('http');
const koa = require('koa');
const app = new koa();
const router = require('koa-router')({prefix: '/api'});
const logger = require('koa-logger');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const index = require('./routes/index');

app.use(logger());
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, 'node_modules')));
app.use(serve(path.join(__dirname, 'build')));
app.use(bodyParser());
router.use(index.routes(), index.allowedMethods());
app.use(router.routes(), router.allowedMethods());
app.use(views(__dirname + '/build', {extension: 'html'}));

http.createServer(app.callback()).listen(80, () => {
    console.log("http server start, listen on 80");
});