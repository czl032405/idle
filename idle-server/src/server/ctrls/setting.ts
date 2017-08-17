import * as express from "express";
import Idle from "../../core/idle";
var router = express.Router();
export default function (app) {
  app.use('/api/setting', router);
};

router.all('/exp', function (req, res, next) {
  res.send({
    statuts: 1,
    result: Idle.Setting.ExpSetting
  });
})

router.all('/idle', function (req, res, next) {
  res.send({
    statuts: 1,
    result: Idle.Setting.IdleSetting
  });
})

router.all('/map', function (req, res, next) {
  var mapSetting = JSON.parse(JSON.stringify(Idle.Setting.MapSetting));
  Object.keys(mapSetting).forEach(key => {
    delete mapSetting[key].teams;
  })
  res.send({
    statuts: 1,
    result: mapSetting
  });
})