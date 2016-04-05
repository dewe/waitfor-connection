# waitfor-connection
Promised waiting for host and TCP port to become available. It's like the node
version of the [`wait-for-it`](https://github.com/vishnubob/wait-for-it) bash
script -- useful for synchronizing the start-up of interdependent services,
such as linked docker containers.

# Install

```
npm install waitfor-connection
```

# Usage

```
var waitfor = require('waitfor-connection');

return waitfor('api.github.com', 443)
  .then(() => console.log('Now it's safe to start application'))
  .catch(err => console.log('Something fishy is going on...', err));
```
