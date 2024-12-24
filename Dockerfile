# Step 1: Transpile to JS
FROM node:22 AS build
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
COPY tsconfig.base.json .
COPY common/package*.json ./common/
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install
COPY backend ./backend
COPY common ./common
COPY frontend ./frontend
RUN npm run build -ws

# Step 2: Build final image
FROM node:22
WORKDIR /app
COPY package*.json .
COPY common/package*.json ./common/
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install
COPY --from=build /app/frontend/dist ./frontend/dist
COPY --from=build /app/common/dist ./common/dist
COPY --from=build /app/backend/dist ./backend/dist
CMD ["node", "backend/dist/server.js"]

