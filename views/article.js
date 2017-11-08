var highlight = require('highlight-syntax/all')
var raw = require('choo/html/raw')
var html = require('choo/html')
var marked = require('marked')

module.exports = view

function view (route, content, mapping) {
  var inner = raw(marked(content, { highlight: highlight }))
  return function (state, emit) {
    var title = /^#\s+(.*)\n/.exec(content)
    title = title ? title[1] : 'Millennial JS'

    emit('DOMTitleChange', title)
    return html`
      <body class="sans-serif lh-copy flex flex-column flex-row-l ph3 ph0-l">
        <nav class="measure-wide measure-narrow-l center pb3 mt4">
          <h2 class="f3 b mt0">
            Millennial JS 🎷
          </h2>
          ${menu(mapping)}
          <h3>🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷🎷</h3>
          <p class="lh-copy">
            Click on one of the links above to select an exercise. You can run
            through exercises in any order, but to truly come to understand the
            angst millennials feel, start at the top — and slowly work your way
            to the bottom. Also remember you'll never be able to afford
            retirement, or buy a house. Happy hacking! 🌿
          </p>
        </nav>
        <main class="measure-wide center markdown-body mv4">
          ${inner}
        </main>
        <header class="mw6 center mv2 mt4-l">
          <strong>
            Status:
          </strong>
          ${state.online ? 'online' : 'offline'}
        </header>
      </body>
    `
  }
}

function menu (mapping) {
  return Object.keys(mapping).map(function (key) {
    var name = key.split('.')[0]
    var href = name === 'welcome' ? '/' : '/' + name
    name = name.replace(/-/g, ' ')
    return html`
      <div>
        <span>
          →
        </span>
        <a class="link black underline" href=${href}>
          ${name}
        </a>
      </div>
    `
  })
}
