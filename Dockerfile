# Step 1: Build the React frontend
FROM node:22 AS build_frontend
WORKDIR /app
COPY package*.json .
COPY common/package*.json ./common/
COPY frontend/package*.json ./frontend/
RUN npm install
COPY common ./common
COPY frontend ./frontend
RUN npm run build -w frontend

# Step 2: Build the backend
FROM node:22 AS build_backend
WORKDIR /app
COPY package*.json .
COPY common/package*.json ./common/
COPY backend/package*.json ./backend/
RUN npm install
COPY common ./common
COPY backend ./backend
RUN npm run build -w backend

# Step 3: Build final image
FROM node:22
WORKDIR /app
COPY package*.json .
COPY common/package*.json ./common/
COPY backend/package*.json ./backend/
RUN npm install
COPY --from=build_frontend /app/frontend/dist ./frontend/dist
COPY --from=build_backend /app/backend/dist ./
CMD ["node", "backend/src/server.js"]

