# Preloading link tags

As we've seen in the previous exercise, the `<script>` tag can get a fair share
of performance optimizations. But it's not the only tag that can control the
priority of how its assets are loaded.

Enter the `<link>` tag. HTML links are most commonly known to load CSS
remotely, but their role in HTML is a bit wider than that. You can think of
link tags to express a relationship between the current page, and any asset
that will eventually need to be fetched.

The way to 

## Notes
```html
<header>
  <link rel="preload" as="style" onload="this.rel='stylesheet'">
</header>
```
