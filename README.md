### CODE STRUCTURE

Our codebase is split into a backend (express + ts) and frontend (react + ts).
The frontend was bootstrapped (with HMR etc) using vite.

### DEVOPS

#### Installing dependencies

If you want to install a new external dependency, please do so in the appropriate package.
For instance, if you want to install a global dependency, like eslint:

```
npm install --save-dev eslint
```

Whereas if you are installing a backend-specific dependency, like express:

```
npm install express -w backend
```

#### Running Code

To run code locally for development:

```
npm run dev -w backend
```

[(localhost:3000)](localhost:3000)

```
npm run dev -w frontend
```

[(localhost:5173)](localhost:5173)

#### Recompiling

In general, running the global build will re-build all packages. This can be useful to ensure everything is working as intended

```
npm run build
```

To transpile a specific package (e.g. common) from ts -> js, run:

```
npm run build -w common
```

### PRODUCTIONIZATION

We intend to build a single docker container that will both serve the frontend and host the backend.
This is currently done using the Dockerfile found in the root directory.
To test this deployment build locally, you can use the command

```
docker compose up -build
```

[(localhost:3000)](localhost:3000)

### DEVCONTAINER

Some folks may want to do development using devcontainers (looking at you qqpsaniard).
This container is set up to run with [DOOD](https://github.com/devcontainers/templates/tree/main/src/docker-outside-of-docker). This should allow your devcontainer to run the productionized server internally. YMMV.
