var readdir = require('read-directory')
var css = require('sheetify')
var choo = require('choo')

css('tachyons')
css('./github.css')

var app = choo()
if (process.env !== 'production') app.use(require('choo-devtools')())
app.use(require('./stores/online'))

app.route('/', require('./views/main'))

var mappings = readdir.sync('./content')
// TODO: add ordering to mappings, link to prev & next article
var article = require('./views/article')
Object.keys(mappings).forEach(function (filename) {
  var content = mappings[filename]
  var route = filename.split('.')[0]
  if (route === 'welcome') route = ''
  app.route('/' + route, article(route, content, mappings))
})

if (!module.parent) app.mount('body')
else module.exports = app
