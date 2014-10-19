module.exports = {
  ".clam": {
    "rootdir": process.cwd(),
    "debug": true,
    "filters": {
      '\\?.+': '',
      '(\\w+)[^\\-\\.]min\\.(js|css)$' : '$1.$2',
      "\\/\\d+\\.\\d+\\.\\d+\\/": "/"
    },
    "remote": {
      // "^\\/mock\\/(.*)": {
      //   "origin": "local",
      //   "local": "/mock/json/$1",
      //   "remote": "http://mock.clamjs.com/$1"
      // }
    },
    "hosts": {
      "a.tbcdn.cn": "122.225.67.241",
      "g.tbcdn.cn": "180.149.155.120",
      "g.assets.daily.taobao.net": "10.235.136.37"
    }
  },
  "server": {
    "rootdir": process.cwd(),
    "port": 80,
    "view": {
      "rootdir": "src",
      "charset": 'UTF-8',
      "supports": {
        ".html": 1,
        ".htm": 1,
        ".do": 1,
        "": 1
      },
      "default":"index.html"
    },
    "assets": {
      "rootdir": "src",
      "charset": 'UTF-8',
      "combo": {

      },
      "package": {
        "pkgName": "ju",
        "define": "KISSY.add",
        "anonymous": true
      }
    },
    "controller":{
      "rootdir":"controller"
    },
    "model":{
      "rootdir":"mock"
    }
  },
  "proxy": {
    "port": 9000,
    // future add this 
    // "dns": false,
    // ignore for paths
    // remote for paths;
    // enum [ignore, remote] for type;
    "type": "", //"ignore,remote"
    "paths": {
    }
  }
};