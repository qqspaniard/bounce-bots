# Step 1: Build the React frontend
FROM node:22 AS build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Step 2: Set up the backend
FROM node:22
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend ./backend
COPY --from=build /app/frontend/dist ./frontend/dist
EXPOSE 3000
CMD ["npx", "ts-node", "backend/src/server.ts"]
