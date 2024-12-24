import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Backend Routes
app.use("/api", apiRoutes);

// Serve the React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
} else {
  console.log("Running in development mode, not serving frontend");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
