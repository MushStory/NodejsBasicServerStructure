// IMPORT
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const moment = require('moment');
const glob = require('glob');
require('moment-timezone');

// IMPORT SETTING
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: process.env.bodyParserLimit }));
app.use(bodyParser.urlencoded({
    limit: process.env.bodyParserLimit,
    extended: false
}));
moment.tz.setDefault('Asia/Seoul');

// FUNC. 라우터 설정
const InitRouter = () => {
    glob('api/**/*.js', (e, files) => {
        files.forEach((path) => {
            // get api
            const apiPath = path.split('api')[1].replace('.js','');
            const api = require('./' + path);
            let { protocol, logic } = api;

            // check api logic
            if(logic === undefined) return;

            // check api protocol
            protocol = protocol.toLowerCase();
            if(protocol !== 'get' && protocol !== 'post') return;

            // init router
            let _router = express.Router();
            eval(`_router.${protocol}('/', ${logic});`);
            app.use(apiPath, _router);
        });
    });
};

// FUNC. 서버 시작
app.listen(3000, () => {
    // 라우터 설정
    InitRouter();
});

// EXPORT
module.exports = {};
