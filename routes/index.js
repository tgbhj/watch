const router = require('koa-router')();
const {getDate, add, del, edit} = require('../modules/index');

router.get('/getDate', async ctx => {
    await getDate(ctx);
});

router.post('/add', async ctx => {
    await add(ctx);
});

router.post('/del', async ctx => {
    await del(ctx);
});

router.post('/edit', async ctx => {
    await edit(ctx);
});

module.exports = router;