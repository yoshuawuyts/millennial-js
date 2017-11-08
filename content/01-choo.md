# choo

In this workshop we're going to be exploring both frontend, and backend
performance. To explore what we can do in the frontend, we're going to make use
of the [choo](https://github.com/choojs/choo) framework.

Choo is a sturdy framework that's built for maintainability and iteration
speed. Let's get started by setting up a Choo project.

```sh
$ npx create-choo-app <project-name>
```
![create-choo-app](./assets/create-choo-app.gif)

## Exercise 1

Choo has a mutable single state in a form of an object available to you within
views and stores. The data flow end up being something like this. You intreact
with the DOM, data changes from the DOM are used in the store, and then the
router. Router triggers the views that then update the DOM. Looks something like this:

```sh
you -----------→ DOM ←------------  view
                  |                  ↑ 
                  |                  | 
                  |                  |
                  |                  |
                  ↓                  |
                store -----------→ router

```

A `view` returns a DOM node to be added to the DOM
via a `route`. Its handler normally takes in `(state, emit)`, so you're able
to manage your content within the view itself. `index.js` file in your
`create-choo-app` project comes with an example of that.

A `store` is what manages your state. When a view sends an `emit` event, a
store has a handler to make an applicable change. This is also a standard way
to pass around data within your application -- whether it's to change your
state, or send an `xhr` call to your server. A new store can be invoked with:

```js
app.use(function (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    emitter.on('your:namespaced-event', function () {
    })
  })
})
```

In your `create-choo-app` create an extra button to handle a subtract event.
Then, in your `store.js` add a handler to update your data.

## Exercise 2

Outside of the custom events you can add to your emitter, choo provides some
that are built in. The two main ones are `state.events.RENDER` and
`state.events.PUSHSTATE`. To see how these work, let's create an extra view.

The extra view should have a input field to update a title throughout your
application.

You should have a redirect anchor tag or button to take you to this page in the
main view, emitting a `emit('pushState', 'newRoute')`. Both views should have a
reference to the shiny new title.

To troubleshoot as you go along, open up your devtools when working on this in
the browser. `create-choo-app` already comes with devtools, so you should be
able to see the events coming in, like `DOMContentLoaded` or the `render`
event, something like this:
![choo-devtools](./assets/choo-devtools.gif)

## See Also
- https://github.com/choojs/choo
- https://github.com/choojs/create-choo-app
- https://github.com/choojs/nanocomponent
- https://github.com/choojs/bankai
