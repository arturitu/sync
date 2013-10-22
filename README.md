sync
====

Real time web app with the Dreamsons

Libs used
-----------

node - The server-side framework.
socket.io - WebSocket power
Redis Pubsub - Wildcard Push Notification support

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
