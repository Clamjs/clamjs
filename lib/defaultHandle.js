module.exports = function (req, res, next) {
  var options = this.options;
  // 先找controller 
  // 再找本地文件渲染
  try {util.use(Path.join(UnderPath(this.rootdir, options.controller.rootdir), this.urlinfo.pathname)).call(this);} catch(e) {
    var extnames = options.view.supports;
    var extname = Path.extname(this.urlinfo.pathname);
    // 是模板文件 
    if (extnames[extname]) {
      // '/' 或者 '/abc'
      var file = this.urlinfo.pathname;
      if (!extname) {
        file = Path.join(file, options.view.index);
      }
      this.render(file);
    } else {
      next();
    }
  }
}