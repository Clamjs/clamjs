var util = require('mace');
var fs = require('fs');
var path = require('path');
var Config = require('configurable');
var hangexit = require('hang-exit');
var hostio = require('host-io');
var Onion = require('tiny-onion');

var debug = util.debug('clam');
var config = new Config('clam');
var server = require('./server.js');

exports.config = config;
exports.on = function (rootdir, noProxy, noMock, noDebug) {
  // 开启阻止退出
  hangexit.hangup();
  // 监听退出任务  
  process.on('exit', function (code) {
    hostio.clear();
    config.unwatch(rootdir);
    server.close();
    hangexit.exit(code);
  });
  config.watch(rootdir);

  config.on('.clam:set:done', function (val) {
    var prjConfig = config.get('.clam');
    var hosts = prjConfig.hosts;
    // 
    // 设置hosts为代理本地
    hostio.insert(prjConfig.hosts, true);
    server.config(util.merge(true, {}, prjConfig, config.get('server')));
  });
  config.on('server:set:done', function (val) {
    server.config(util.merge(true, {}, config.get('.clam'), Config.get('server')));
  });
  // 主动触发以初始化server的配置；
  config.emit('.clam:set:done');
  server.use(function (req, res, next) {
    this.globalConfig = config;
    next();
  }).listen(9001);
};
exports.doc = function (type) {
  util.warn('Coming soon');
};
exports.init = function (rootdir) {
  // 初始化配置文件
  config.init(rootdir, require('./config.js'));
};