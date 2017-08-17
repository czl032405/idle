import * as path from "path";
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as glob from "glob";
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as session from 'express-session';
import * as uuidV4 from 'uuid/v4';
import * as md5 from 'md5';
import * as express from "express";
const app = express();
const args = process.argv.join(" ");

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser('233'));
app.use(session({
    name: 'idle',
    secret: '233',
    cookie: { maxAge: 10 * 60 * 1000 },
    resave: true,
    saveUninitialized: true,
    genid: function (req) {
        return uuidV4() // use UUIDs for session IDs
    },
}));
app.set('port', (process.env.PORT || 80));
app.set('etag', false)


const staticPath = path.resolve(__dirname, '../../../idle-client/dist');
console.info(staticPath);
app.use(express.static(staticPath,{
    etag:false,
    setHeaders(res: express.Response, path: string, stat: any){
        if(/\.[^\.]*\./.test(path)){
            res.setHeader('Cache-Control','max-age=6666666666');
        }
    }
}));





var ext = /\.ts$/.test(__filename) ? 'ts' : 'js';
var controllers = glob.sync(`./ctrls/*.${ext}`, { cwd: __dirname });
controllers.forEach(function (controller) {
    require(controller).default(app);
});



app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    next(err);
});



app.use(async function (err, req, res, next) {
    if (/api/.test(req.path) && err.message || err.errmsg || typeof err == "string") {
        res.status(200)
        res.send({ status: 0, msg: err.stack || err.errmsg || err })

    }
    else {
        // res.status(err.status || 500);
        next(err);

    }

});

if (!/test/.test(args)) {
    app.use(function (err, req, res, next) {
        res.send();
    })
}



app.listen(app.get('port'), () => {
    console.log(`server hosted ${app.get('port')}`)
})





export default app;