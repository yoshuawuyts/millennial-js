# pperf (but not really)

You're in a forest. What do you do?

> look

You see a computing machine.

> look at computing machine

The computing machine looks back

> run

There is no running from the machine. You're not fast enough.

---

Welcome to the performance chapter! In this lil snip we'll get you up to speed
with the ✨ Performance API! ✨.

The perf API (as us kids call it) might have a funny ring to it. It's not quite
an API that you can call to make things more performant. It's an API that helps
you _measure_ performance.

As some old person once said: "If you can't measure it, you can't improve it".
I think Buzzfeed debunked this at some point, but it sounds catchy so we'll
roll with it.

The perf API is available in most modern browsers, and in the `8.x` or higher
Node versions. There are slight differences between the two APIs, but they can
be reasoned about similarly. In this exercise we'll focus on the browser,
because of better integration with devtools.

---

The perf API has a few methods:
- `performance.mark(name)`: create a new performance mark
- `performance.measure(name, markname1, markname2)`: measure the time between
  two performance entries.
- `observer = new window.PerformanceObserver(callback(entries))`: create
  a new performance observer that calls a callback each time a new performance
  entry is created.
- `observer.observe(opts)`: start listening for performance entries. Requires
  `opts.entryTypes`. Usually a value of `[ 'measures' ]` is enough, but [other
  types](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType)
  are available.

## Exercise 1
- Create a performance observer.
- Create a button that triggers some computation (e.g. increment a counter)
- Measure the duration of a computation.

### Hint
- Create a button with the `document.createElement()` API.
- Add a listener with the `button.addEventListener` API.
- Wait for `DOMContentLoaded`.

---

We should now have a cool baseline. When you click a button it performs a small
computation, and measures how long it took. Nice!

Now, inside the browser there's a mechanism called the `performance entry
buffer`. It holds all performance entries, and is usually capped at around 200
entries. Once you go over that number, performance can no longer be measure.
That's not great. So let's clean up our marks and measures as we go along.

## Exercise 2
- Make sure each performance entry has a unique name.
- Only measure performance entries inside idle callbacks.
- Clean up performance marks after creating a measure.
- Clean up performance measures after reading them.

---

Creaing performance observers isn't necessarily the cleanest API. There's a
good amount of things you need to remember. Let's create a module that makes
this a little simpler. The API should be:
```js
var onPerf = require('./on-performance')

onPerf(function (entry) {
  console.log(entry.name + ': ' + entry.duration + 'ms')
})
```

## Exercise 3
- Create a higher level wrapper for the performance observer.
- Emit the initial performance entries in `performance.getEntries()` as regular
  events (make sure events are emitted in order).
- Clean up all prior performance entries.

---

This is pretty cool. But one problem is that if you create multiple listeners,
it might not get all events, because we're cleaning them up. The solution is to
share the emitter mechanism through a global (e.g. `window`), and allow
multiple listeners to be attached.

## Exercise 4
- Make it so multiple instances of the performance observer can be attached and
  receive all events.

### Note
This might throw off certain analytics vendors, as they will try and do
something similar. If you're going to be using the things you just learned in a
production environment, it might be useful to do a little research to figure
out how to play nicely with analytics vendors, as they might assume that nobody
else is looking at the performance API.

## See Also
- https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
