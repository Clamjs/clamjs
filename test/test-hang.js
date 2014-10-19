var hang = require('../lib/hang.js');
process.on('exit', function () {
  console.log('get exit event');
  setTimeout(function () {
    console.log('do exit action')
    hang.exit(0);  
  },1000);
});
hang();