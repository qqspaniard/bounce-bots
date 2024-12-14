### CODE STRUCTURE

Our codebase is split into a backend (express + ts) and frontend (react + ts).
The frontend was bootstrapped (with HMR etc) using vite.

### PRODUCTIONIZATION

We intend to build a single docker container that will both serve the frontend and host the backend.
This is currently done using the Dockerfile found in the root directory.
To test this deployment, you can use the command

```
docker compose up -d --build webapp
```

[(localhost:3000)](localhost:3000)

### DEVOPS

To run code locally for development:

```
cd backend
npm run dev
```

[(localhost:3000)](localhost:3000)

```
cd frontend
npm run dev
```

[(localhost:5173)](localhost:5173)

### DEVCONTAINER

Some folks may want to do development using devcontainers (looking at you qqpsaniard).
This container is set up to run with [DOOD](https://github.com/devcontainers/templates/tree/main/src/docker-outside-of-docker). This should allow your devcontainer to run the productionized server internally. YMMV.
