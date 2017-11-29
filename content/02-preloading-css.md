# Preloading link tags

As we've seen in the previous exercise, the `<script>` tag can get a fair share
of performance optimizations. But it's not the only tag that can control the
priority of how its assets are loaded.

Enter the `<link>` tag. HTML links are most commonly known to load CSS
remotely, but their role in HTML is a bit wider than that. You can think of
link tags to express a relationship between the current page, and any asset
that will eventually need to be fetched.

The way to express how `<link>` tags should operate, is through its `preload`
attribute. The normal way to load CSS is by doing:

```html
<head>
  <link rel="stylesheet" href="/bundle.css">
</head>
```

## Exercise 1
- create an `index.html` file
- create an `index.css` file
- load the CSS from HTML using the link tag

---

Now this is not ideal. If you open the `performance` tab in your devtools
(Chrome is strongly recommended here), you'll notice that the CSS here is
__render blocking__. This means that no rendering will happen before the
network request is resolved. Not great.

Let's make it so CSS loads asynchronously. We can do this by using the
`preload` attribute. The idea is to make the `<link>` tag preload the CSS
first, and once it's loaded, interpret it as CSS. The easiest way to achieve
this is as follows:

```html
<head>
  <link rel="preload" as="style" onload="this.rel='stylesheet'">
</head>
```

## Exercise 2
- preload the CSS from HTML using the link tag

---

## Wrapping up
And that's it for preloading CSS. If you've paid attention to the loading of
the page, you might see a flash of unstyled content — a brief flash of unstyled
DOM elements. We'll dig into how to prevent this in a later exercise.

Next up is preloading webfonts!
