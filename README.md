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
  .then(() => spinUpApplication())
  .catch(err => console.error(err));
```

# Development

Tests are best run in docker:

```
docker-compose build
docker-compose run waitfor-connection npm test
```
