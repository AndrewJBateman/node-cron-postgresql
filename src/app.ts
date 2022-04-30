import express from "express";
import config from "config";

import apiRoutes from "./routes/api.routes";

const port = config.get<number>("port");

const app = express();
app.use(express.json());

app.listen(port, async () => {
  console.log(`Cron-Postgresql app listening at http://localhost:${port}`);
  apiRoutes(app);
});
