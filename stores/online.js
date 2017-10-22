module.exports = store

function store (state, emitter) {
  state.online = typeof window !== 'undefined'
    ? navigator.onLine
    : false

  emitter.on('DOMContentLoaded', function () {
    window.addEventListener('online', function () {
      state.online = true
      emitter.emit('render')
    })

    window.addEventListener('offline', function () {
      state.online = false
      emitter.emit('render')
    })
  })
}
