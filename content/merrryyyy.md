# merrryyyy

What do we want? Middleware! When do we want it? Now! What do we want? Router!
When do we want it? Now, obvs. duhdoi.

Merry is a cute & simple API framework for the backend. It does the minimal
amount of things you need to build out your APIs -- middleware, routing and
logging. Everything else is up to you (you can be anything you want to be).

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
    $ curl -i -d "{'body': 'butts'}" -H 'Content-type: application/json' localhost:{port}
    ```

## up next
- `merry` uses `pino` under the hood for logging, if you want to learn more
  check out `pino`, or look into our [chapter on logging patters](./logging).
- `merry` doesn't have a specific error handling method, but we do have a
  pattern we like to follow, so checkout our [error part of the workshop](./error-patterns).
