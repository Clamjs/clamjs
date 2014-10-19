exports = module.exports = {
  "rootdir": "/Users/Ryota/Personal/github/Clamjs/clam/test",
  "debug": false,
  "filters": {
    // 去掉query
    "\\?.+": "",
    // 去掉min文件
    "(\\w+)[^\\-\\.]min\\.(js|css)$": "$1.$2",
    // 去掉版本
    "\\/\\d+\\.\\d+\\.\\d+\\/": "/"
  },
  "paths": {
    "^\\/local\\/?(.*)": {
      "type": "local",
      "local": "/$1",
      "remote": "http://mock.clamjs.com/$1"
    },
    "^\\/remote\\/?(.*)":{
      "type":"remote",
      "remote":"http://v.youku.com/QVideo/~ajax/getVideoPlayInfo?__rt=1&__ro=&id=199250758&sid=0&type=vv&catid=95"
    }
  },
  "hosts": {
    "a.tbcdn.cn": "122.225.67.241",
    "g.tbcdn.cn": "180.149.155.120",
    "g.assets.daily.taobao.net": "10.235.136.37"
  },
  "dns": {
    "c.cc": "127.0.0.1"
  }
}