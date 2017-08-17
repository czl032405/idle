import * as express from "express";
var router = express.Router();
import Idle from "../../core/idle";
import * as md5  from 'md5';
export default function (app) {
  app.use('/api', router);
};

router.get('/', function (req, res, next) {
    res.send("idle2")
})