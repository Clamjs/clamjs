exports = module.exports = {
  "view": {
    "rootdir": "model",
    "charset": "UTF-8",
    "supports": {
      ".html": "juicer",
      ".htm": "juicer",
      ".do": "juicer",
      ".json": "mock"
    }
  },
  "assets": {
    "rootdir": "src",
    "combo": {},
    "charset": "UTF-8",
    "supports": {
      ".less.css": "less",
      ".sass.css": "sass",
      ".tpl.js": "juicer"
    },
    "package": {
      "define": "KISSY.add",
      "anonymous": true
    }
  },
  "model": {
    "rootdir": "model"
  },
  "controller": {
    "rootdir": "controller"
  }
}