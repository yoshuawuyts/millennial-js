# merrryyyy

Merry is a cute & simple API framework for the backend. It does the minimal
amount of things you need to build out your APIs -- middleware, routing and
logging. Everything else is up to you (you can be anything you want to be).

We found that when working with backend APIs we mostly only need a router and
some middleware to handle `req` and `res`. Merry comes with just that. Oh! And
also logging.

Note: If you've done the [http](/simple-http) portion of the workshop, that's good. If you
haven't, starting here is good too, but we do recommend checking out `http`
afterwards.

## exercise 1

```sh $ npm i -S merry ```

1. start off with and `index.js` file and `require('merry')`
2. `merry` allows for an env object to be passed in from the start, so start
   off by adding a `PORT` value to an env object
3. initialize your app with the env object from above
4. start up the app with `app.listen(app.env.PORT)`
5. set up a `GET` route and log out info with `ctx.log.info`
6. send some data over with `ctx.send`. This method uses streams and encodes
   your data into `JSON` for you.
7. `curl -i localhost:{port}` to check over your reponse
8. now try parsing an incoming request with `ctx.parse()`. This takes in an
   incoming `JSON` stream from `req` and turns it into an object. You can send
   this over with curl with `-d` flag. You might also want to pass over the
   headers as well:
    ```sh
    $ curl -i -X POST -d '{"body": "butts"}' -H 'Content-type: application/json' localhost:{port}
    ```

Merry comes with a way to hook up your own middleware in a standard `app.use`
method. The next thing to do wiwould be to implement one of your own. A pretty
common one to have is a `CORS` implementation. The middleware signature you are
going to work with is  `req, res, ctx`.

- start off with writing an `app.use` and passing it `req, res, ctx`
- to handle `CORS` you need to set `Access-Control-Allow-*`
  [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) on the
  `res`
- `curl -i` to see if they are coming through

## See Also
Merry uses `pino` under the hood for logging, if you want to learn more check
out [pino](github.com/pinojs/pino), or look into our [chapter on logging
patterns](./logging).

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
