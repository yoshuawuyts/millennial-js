# cmprsn 

This portion of the workshop is focused on shrinking the size of data you send
over to your client, aka the compression chapter. A lot of the times, you'll
have your nginx doing the work for you, but on some occassions you might want
to do this on a fly. So let's do some HTTP compression.

## Exercise

You want to be cmprssng & streamn on the fly as the reqsts <sub>come</sub><sup>in </sup>. To
tackle this exercise, put together a simple `html` file you want to be serving
up to your client. 

Modern browsers accept one (or all) three types of compression algorithms:
`deflate`, `gzip`, and `brotli`. You can see which ones are accepted under the
requests `Accept-Enconding` header:
![accept-encoding](./assets/accept-encoding.png)

Node has a [zlib](https://nodejs.org/api/zlib.html) implementation, which
allows you to compress both in `deflate` and `gzip`. For brotli, you might want
to look [this node's implementation](https://github.com/MayhemYDG/iltorb)

- create a server with `http`
- as a `req` comes in send back a `deflate` version of the file using `zlib`
- curl your server and see what you're getting back. If it looks like
  gibberish, you're good.

Next try sorting out which of the compression algorithms the browser is
accepting.
- check the `accept-encoding` header.
- send back the correctly compressed version. You might have to do a bit of matching.

To checkout the compression sizes you're getting back, pipe in something like
word count to your `curl`:

```sh
$ curl -i -H "accept-encoding:gzip" localhost:8080 | wc
```

To 🍄 level up 🍄 , implent enbrotli compression as well!

### Hint:
You might want to create a read stream to send back the html file. Once you're
streaming, we suggest you use [pump](https://github.com/mafintosh/pump) instead
of the usual `.pipe` to handle your stream gracefully. We suggest to also
implement the optional callback to handle and the log the error, which is quite
important in production purposes.

Don't forget to set the correct `Content-Encoding` when you send back the
compressed file.

## See Also
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
