var raw = require('choo/html/raw')
var html = require('choo/html')
var marked = require('marked')

module.exports = view

function view (route, content, mapping) {
  var inner = raw(marked(content))
  return function (state, emit) {
    return html`
      <body class="sans-serif lh-copy">
        <main class="mw6 center">
          ${inner}
        </main>
        <nav class="mw6 center pa3">
          <h2 class="f3 b mt0">
            Navigation
          </h2>
          ${menu(mapping)}
        </nav>
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
