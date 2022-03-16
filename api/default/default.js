module.exports = (params) => {
    // IMPORT
    let { router } = params;
    const db = require('../../util/mysql');
    const util = require('../../util/util');

    // FUNC. default api
    router.post('/', async (req, res) => {
        try {
            // PARAM
            const test = String(req.body.test);

            // PROCESS
            // select
            await db.exec(`SELECT * FROM test WHERE test=${db.escape(test)}`);

            // insert
            await db.exec(`
                INSERT INTO test(
                    test) VALUES(
                    ${db.escape(test)}
                );
            `);

            // update
            await db.exec(`UPDATE test SET test=${db.escape(test)}`);

            // delete
            await db.exec(`DELETE FROM test WHERE test=${db.escape(test)}`);

            // RETURN
            res.status(200).send({
                test: test
            });
        } catch (e) {
            console.log(e);
            util.SaveLog('/default/default', JSON.stringify(e), req);
            res.status(500).send(e.toString());
        }
    });

    return router;
};
