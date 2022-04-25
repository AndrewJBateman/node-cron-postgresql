import { Express, Request, Response } from "express";

// import handlers
import { getDataHandler } from "../controllers/data.controller";

// export single function to handle all express routes
function apiRoutes(app: Express) {
  app.get('/api', getDataHandler)
}

export default apiRoutes;