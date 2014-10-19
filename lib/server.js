var util      = require('mace');
var Gala      = require('gala');
var Path      = require('path');
var Url  = require('url');
var Fs        = require('fs');
var debug     = util.debug('clam:server');
var Onion = require('tiny-onion');
var Fetch = require('http-fetch');
var Dac = require('dac');
module.exports = new Gala().use(function (req, res, next) {
  var app = this;
  var options = app.options;
  var filters = options.filters;
  var remotes   = options.remotes;
  var hosts   = options.hosts;
  var url     = app.url;
  util.each(filters, function (val, key) {
    url = url.replace(new RegExp(key), val || '');
  });
  util.some(remotes, function (val, key) {
    key = new RegExp(key);
    if (key.test(url)) {
      var ret = val[val.origin];
      app.nrlconf = val;
      return url = url.replace(key, ret);
    }
  });
  app.nrl = url;
  try {
    util.use(Path.join(this.options.rootdir, '/gala.js')).call(this, req, res, next);
  } catch(e) {
    next();
  }
// 本地配置的path处理
}).use(function (req, res, next) {
  var app = this;
  var options = app.options;
  var nrlconf = app.nrlconf;
  if (!nrlconf) {
    return next();
  }
  if (nrlconf.origin === 'local') {
    var file = UnderRoot(options.model.rootdir, app.nrl);
    if (!Path.extname(file)) {
      file = file.replace(/\/$/,'') + '/index.js';
    }
    if (Fs.existsSync(file)) {
      return util.use(file).call(this, req, res, next);
    }
    return next();
  }
  app.nrlinfo = Url.parse(app.nrl);
  var nhostname = app.nrlinfo.hostname;
  var hosts = app.globalConfig('.clam').hosts;
  if (hosts[nhostname]) {
    app.nrlinfo.hostname = hosts[nhostname];
    app.nrlinfo.host = app.nrlinfo.hostname + ':' + (app.nrlinfo.port || 80);
  }
  Fetch.fetch(req, app.nrlinfo, function (err, data, nsres) {
    Fetch.pipe(err, data, nsres, app.res);
  });
// 所有的html请求
}).use(/\.(html|htm)$/, function (req, res, next) {
  var app = this;
  var options = app.options;
  var urlinfo = app.urlinfo;
  var modelRoot = Path.join(app.rootdir, options.model.rootdir);
  // SSI and others methods;
}).use(/\.(do|json)$/, function (req, res, next) {
  // model mock

// normal combo
}).use(/\?\?.*$/, function (req, res, next) {
  // loader
  this.assign('combo', true);
  this.assign('type', 'kissy');
  this.send();
// yui combo
}).use(/\/combo\?.+$/, function (req, res, next) {
  // loader
  this.assign('combo', true);
  this.assign('type', 'yui');
  this.send();
}).use(function (req, res, next) {
  this.render();
});