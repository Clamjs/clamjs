var Config = require('../lib/Config.js');
var util = require('mace');

module.exports = function (req, res, next) {
  this.assign('hosts',Config.get('project').hosts);
  
  util.each('log done error trace logue'.split(' '), function (name) {
    var A = {
      "name": "A",
      "childs": [
        /regexp/ig,
        function a(){},
        true,
        new Error('this is an error'),
        1111,
        "string"
      ],
      obj: {
        'name':'obj'
      }
    };
    A.circle = A;
    util[name]('this is %s and object A is : %s',name, A);
  });
  // this.send();
  next();
  // this.error('this is a error test with debug');
  // return ;
};