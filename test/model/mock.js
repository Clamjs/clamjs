module.exports = function (req, res, next) {
  this.assign('msg','china');
  this.render('mock.html');
}