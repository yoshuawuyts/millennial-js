# h t ttt t t p p

Us skinny-jean wearing, frappuccino slurpin chain gang of young folk like
things homegrown and from scratch. You know things like, sourdough, kale, http
servers. 

Using a framework to sort out larger APIs and services is usually a good idea,
but a lot of the times they do too much for what you actually need (hello it
me, information overload, did you miss me?). We want you to try out building a
server on your own. 

## exercise 1 - server 
Your quest is to write up an http module to handle the usual suspects: `req`, `res`.

1. start of by creating an `index.js` file
2. require `http`. `http` API is exposed directly in node, so you don't need to
   npm-install it
3. `http.createServer()` should help you with most of the legwork of creating a
   server
4. attach a listener to a specific port so you can serve up your page
5. intercept any given `req` and set the correct `res` headers for a `json`
   with `res.setHeader()`
6. set a status code to your response with `res.statusCode`
7. write `json` back with with `res.write`(2)
8. don't forget to close the connection with `res.end()`
6. serve it with good ol' node `node ./index.js` 
7. you can access your server with curl (or browser! capitalism tought us about
   options after all) with `curl -i localhost:{port}` and get the body and
   headers back (1). You should get something that looks like this:
   ![simple-response](../assets/simple-response.gif)
8. to 🍄  level up 🍄, look into` http.request()`

## exercise 2 - router
Think of how you might want to handle routing. Although `http.request()` has a
`path` option, looking at an abstraction is a good idea

1. check out [reg-router](https://github.com/lrlna/reg-router) or [server-router](https://github.com/yoshuawuyts/server-router) as your router options.

## tipsy tips
(1) if you're using the browser to access your server, open up the network tab
to see your headers information. `Network` > `{yourRoute}` > `Headers`. In the
same line of thinking, you can preview your `response` under the same tab --
`Network` > `{yourRoute}` > `Response`.

(2) altenatively you should look into `res.writeHead()` to handle setting a
status code, sending back body, and setting headers.


## see also
- [node's http docs](https://nodejs.org/api/http.html)
- [content-type headers on mdn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
