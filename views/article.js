var raw = require('choo/html/raw')
var html = require('choo/html')
var marked = require('marked')

module.exports = view

function view (route, content, mapping) {
  var inner = raw(marked(content))
  return function (state, emit) {
    var title = /^#\s+(.*)\n/.exec(content)
    if (title) title = title[1] || 'Millennial JS'

    emit('DOMTitleChange', title)
    return html`
      <body class="sans-serif lh-copy flex flex-column flex-row-l">
        <nav class="mw6 center pb3 mt4">
          <h2 class="f3 b mt0">
            Millennial JS 🎷
          </h2>
          ${menu(mapping)}
        </nav>
        <main class="measure-wide center markdown-body mt4 mb4-ns">
          ${inner}
        </main>
        <header class="mw6 center pv3">
          Status: ${state.online ? 'online' : 'offline'}
        </header>
      </body>
    `
  }
}

function menu (mapping) {
  return Object.keys(mapping).map(function (key) {
    var name = key.split('.')[0]
    return html`
      <div>
        <span>
          →
        </span>
        <a class="link black underline" href=${'/' + name}>
          ${name}
        </a>
      </div>
    `
  })
}
