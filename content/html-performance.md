# HTML performance

If you've been writing websites for a while, you might be familiar with our
good ol' Hyper Text Markup Language. Using this fun little XML-deriviate,
you're able to weave together all sorts of square items on a page. Fun!

There's a catch though: the HTML of yore you knew, is different from today's
markup. HTML5 started by adding all sorts of semantic tags to enable the move
away from Flash, but it didn't stop there. HTML is a living standard these
days — that means continuous deployment of new features, with either daily, or
monthly updates depending on your browser (or yearly, if you use Safari 👀).

One of the exciting new features that's recently landed in browsers is the
ability to asynchronously load resources. This means that your browser can go
ahead and render things, while it's performing requests in the background. And
not only that, we've also been handed controls to determine the order in which
things should be downloaded.

Now, if we go ahead and add HTTP2 in the mix, things become real interesting.
HTTP2 comes with a bunch of new features, but probably the most practical
addition is that all requests to the same server can now share a connection!
(This is called "multiplexing" in computer-speak). So this now means we can
can now efficiently perform lots of requests to the same server, with little
overhead, and the ability to prioritize which resources we need straight away,
and on which we can wait a little. Booyah — resilient emerging-market-proof
networking!

## Task
The only way to approach this right, is to get a feel for the tags. So we're
going to go low-tech here, and just have you write a bunch of files so you can
build some intuition as to how these things work.

- Create a "hello-world" HTML file.
- Create a JS file that logs something out to the console.
- Create a JS file that logs something else out to the console.
- Create a webfont file (e.g. download a `.woff/.woff2` file to your local
  directory).
- Copy the file above, and export it as a ES6 module.
- Create a script tag with a `defer` attribute.
- Create a script tag with an `async` attribute.
- Create a script tag with `type=module` as an attribute
- Create a script tag with a `nomodule` attribute.
- Create a link tag with a preload attribute for a web font.

Now serve all this up with `serve(1)` or `httpser(1)` (which can be installed
from npm). Open up your devtools, navigate to the network tab, and watch how
things load. If you're looking for some challenges, perhaps try some of these:

- Can you make one defer tag depend on another?
- Can you load a defer tag first, detect when an async tag loads, and use some
  code from the async tag?
- Can you style some text in your body using CSS

## Notes
- Mixing a `defer` and `async` script tag is probably a bad idea. One if not a
  fallback for the other. `async` means a resource can load in any order, where
  `defer` means it'll load in order of declaration.
- Declaring script tags without any of the async attributes will load as soon
  as it's encountered. `defer` does ignores all inline scripts, and will load
  whenever. Even if they have the `defer` attribute on them to; if there's
  content, it'll load as soon as possible.

## See Also
- http://devdocs.io/html/element/script

## Author's notes
While "emerging markets" is definitely a buzzword, the idea behind it is not.
People in non-western countries tend to use the internet mostly on Android
devices, using a 3g connection. Also 4g while going through a tunnel in
New York is not much better. What we're trying to say is: making internet
things that work well with less-than-ideal connectivity is probably worth it
for most people. Tunnel proof web. The internet of tunnels. The internet of
Australia's entire east coast. But like, _proof_. Something like that.
