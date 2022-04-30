import { Express, Request, Response } from "express";

// import handlers
import { getDataHandler, getCronHandler } from "../controllers/data.controller";

// export single function to handle all express routes
function apiRoutes(app: Express) {
  app.get("/api", getDataHandler);
  app.get("/api/cron", getCronHandler);
}

export default apiRoutes;
