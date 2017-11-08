# Preloading Webfonts

Web fonts make the web go round. Or so they would have you believe. WebFont is
a conjugation of two words. First of there's the word "web". The web is
millennial lingo for "the internet". It's in no way related to spiders. Just
like "chillax" is not related to the English language.

The second word in webfont is the word "font". This is not short for
"fontaine". Unlike "web" this is a regular English word in most English
languages. It's hard to explain the meaning of the word "font". Use the web to
look it up if you don't know what it means.

In the previous exercise we looked at loading CSS asynchronously. This allows
the page to load CSS in the background, while already rendering. The timeline
for loading CSS is along the lines of this:

1. Make a request for `/index.html`
2. `index.html` is sent back; parse it
3. Start rendering whatever is in `index.html`
4. Kick off a request for `bundle.css` (can be any name, but we like "bundle").
5. Rendering probably finishes here
6. CSS comes back, it contains a link to a webfont
7. Get the webfont
8. Render CSS

In this case we'd very much like CSS to start rendering without waiting for the
fonts to load.

> Hold on there "Steve", but rendering CSS first, and fonts second — won't that
> cause multiple renders to happen?

Alright there, yeah — good point. We'll indeed have multiple renders with the
approach we're going for. 3 renders to be exact:

- The first render happens when the HTML loads.
- The second render happens when the CSS loads.
- The third render happens when the WebFont loads.

Now this is a Pretty Good Thing™. If you do things right, the first render, and
the second render will be identical. The overhead of the render step would be
to interpret more CSS than is available in the first pass — but then nothing
changes. It's a simple check, which should usually be a sub-millisecond value.

The changes between the second and the third render are probably larger.
Intially we'll only have a system font, and once the webfont loads, we'll use
the system font.

## Exercise 1
- Reuse the HTML and (static) server setup from previous exercises.
- Pick a cool webfont from google fonts.
- Pick a fallback font from <site goes here>.
- Declare the use of a webfont in CSS.
- Style some text.

---

Okay cool, you should now have some styled text in your application. Neat!
Now let's improve this by preloading the webfont. This can be done in the same
way as with CSS.

```html
<link rel="preload" as="font" href="/my-font.woff">
```

## Exercise 2
- Add a preload tag for the webfont.

---

Open up the network tab in you your Browser's devtools. If things went well,
you should see a request for your fonts before the page is loaded… and a second
request!

This is because the browser is a bit finnicky with preloads on particular
assets. Preloading WebFonts, images, and other assets require an extra
`crossorigin` attribute. Now we won't get into the details of CORS in this
workshop, it's worth [reading up
on](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes).

## Exercise 3
- Add a preload tag for the webfont.
- Make sure it only loads once.

## Author's notes
Not every type of asset can be preloaded. The specification only names examples
of resources that can be preloaded, but in the end it's up to the browser
vendor to decide which ones to support. So before you commit to preloading
everything, it might be worth doing some research.

## See Also
- [practicaltypography.com/system-fonts](http://practicaltypography.com/system-fonts.html)
