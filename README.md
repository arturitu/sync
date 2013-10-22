Sync Project
====

A multiuser real time web app for families to play together with the Dreamsons

Libs used
-----------
Real time web application based on Redis Pub/Sub with Node.js and socket.io.

* node - The server-side framework.
* socket.io - WebSocket power.
* Redis Pubsub - Wildcard Push Notification support.

## Set up

Install [node](http://nodejs.org), [npm](http://npmjs.org) and [Redis](http://redis.io).
Install the node modules when you clone this directory.

    npm install

package.json will automatically installs the dependant npm modules.

Run server
----------------

    $ redis-server
    $ node server.js
    

* Start sync on computer & a mobile device > [http://localhost/sync/public/](http://localhost/sync/public/)
(May be you need to change the IP on index.html to run in your localhost between computer & mobile)
```html
<script src="http://192.168.1.34:3000/socket.io/socket.io.js"></script>
```
