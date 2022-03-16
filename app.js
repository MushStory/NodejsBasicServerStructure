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
            const router = require('./' + path)({
                router: express.Router()
            });

            // init router
            app.use(apiPath, router);
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
