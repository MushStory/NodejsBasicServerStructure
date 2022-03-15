// IMPORT
// const db = require('../../util/mysql');
const util = require('../../util/util');

// FUNC. default api
const logic = async (req, res) => {
    try {
        // PARAM
        let id = String(req.body.id);

        // PROCESS
        // let value = await db.exec(`
        //     SELECT * FROM test WHERE id=${db.escape(id)}
        // `);
        // if(value.length < 1) throw 'non id';

        // RETURN
        res.status(200).send({
            id: id
        });
    } catch (e) {
        console.log(e);
        util.SaveLog('/default/default', JSON.stringify(e), req);
        res.status(500).send(e.toString());
    }
};

// EXPORT
module.exports = { protocol: 'get', logic: logic };
