# papa kappa

Databases are tricky. There are no silver bullets, despite what marketing folks
would like you to believe. ACID is an acronym where 2 letters don't matter.
NOSQL was a thing, got over the hype, and is now just as boring as any other
wave of technology.

Also if you learn enough about databases you'll shed a tear if you know it
processes people's financial data. Everything can go wrong. Nothing works the
way you would hope it would. At least not if you want enough throughput for it
to be feasible. The present is grim dark.

We can't possibly start to cover all varieties of databases, and their
tradeoffs. Instead what we'll do is pull a lever, fast forward into the future,
and talk about a particular type of database (and architecture) that has us
excited. Because yay, fringe development!

## The Status Quo

In traditional databases you have a database process running on a machine
somewhere. The database "speaks" a wire protocol, and servers process requests
from clients and in turn persist them to the database.

The traditional architecture can at times be tricky. If you add more servers to
talk to the database, the database might start having trouble handling
requests. Migrating your database to a larger, and larger machine will only
ever take you so far; so usually some form of horizontal scaling is applied.

Horizontal scaling in this sense means adding more machines to the problem,
rather than upgrading machines to be more powerful. Adding machines can take
many forms; and is often used in conjunction with partitioning the database,
and/or adding caches.

Traditional databases come with their own fair share of other problems. Here's
a fun few:
- Traditional DBs rely on several layers of caching for scaling. In-database
  there's materialized views. On top of that there's often caches like redis or
  memcache. Caches can get stale, corrupted, or disconnected from the network —
  none of which are easy to debug.
- Recovering from incorrect entries can be hard. Traditional databases only
  store parsed data, and usually discard old entries. You can always restore
  from backups if your database is corrupted, but it will not save you from
  incorrect parsing logic before the data is persisted.

## K A P P P P A

_note: for brevity's sake we're going to gloss over replication modes, and the
tradeoffs of multi-leader systems, concensus protocols and all that. Let's
assume that that the things we're going to be discussing next can be replicated
fairly easily._

The kappa architecture is a bit different. Instead of storing a computed value,
we store the raw data in a log. And using specialized processors, we parse the
data into an _index_ (also known as _materialized view_).

You can think of a _log_ as an Array, and an _index_ as an Object (or key-value
store). Each entry in the log contains some metadata — the time it was created,
some form of sequence number. There's a field of studies on how to create
non-conflicting entry types called CRDTs.

```js
var log = []
var index = {} // Although this can be any value, key-value is the most common
```

You can think of using a log database as inverting the database. They come with
a good set of benefits: data resolution will never get lost because you store
the raw data. All that's needed to perform a database migration is to create a
new index on top of the log (which can't really be considered a migration).

And finally: scaling is quite convenient. Because indexes use a log as the
source of truth, they're much more reliable than traditional caches to scale
data.

If you want to dig deeper into the topic, check out this video which goes
in-depth into the kappa architecture.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fU9hR3kiOK0" frameborder="0" allowfullscreen></iframe>

---

## Exercise 1
Alright, let's create an HTTP server that accepts a request, and stores data in
an array.

```js
var http = require('http')

http.createServer(function (req, res) {
  // persist data here to a log
}).listen(8080)
```

- Create an HTTP server that can handle requests. There's no need to parse
  input data, but you can if you're feeling like it.
- Whenever a request is received, push an object to a log. Include a timestamp,
  sequence number, and a (random) integer.

---

## Exercise 2
Cool, we should now have a bunch of numbers stored in a log. It's time to
create a summary of all the data.

```js
var http = require('http')

http.createServer(function (req, res) {
  if (req.url === '/summary') {
    // provide a summary
  } else if (req.url === '/add') {
    // add data
  }
})
```

- requests to `/summary` should provide a summary of all the data
- requests to `/add` should add a number to the log
- when data is added to the log, the index should be updated too.

## Exercise 3
Alright, neat! We're getting close to something useful. Now let's persist our
log to disk on each write. Let's use `.csv`.

```js
var path = require('path')
var fs = require('fs')

fs.write(path.join(__dirname, 'file.csv'), data, function (err) {
  // handle err
})
```

- whenever data is written to disk save it to `file.csv`. Split it by newline.
- when the server starts, read the data from `file.csv`, and populate the
  in-memory log and index.
- test out data is being persisted between restarts of the process.

---

## Wrapping Up
And that's it. You now have a working log database on your machine. There's
lots of optimizations that would need to be done for it to work in production,
not the least thinking about replication, preventing conflicts, persisting,
using effient on-disk data structures, partial-replication and integrity
checks. It's a lot; but they all operate on top of the same basics shown off
here. We hope it was useful!

## See Also
- http://milinda.pathirage.org/kappa-architecture.com/
- https://github.com/mafintosh/hyperlog
- https://github.com/substack/hyperlog-index
- [the log as the unifying data structure](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
- https://www.npmjs.com/package/hypercore
