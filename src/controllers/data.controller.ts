import { Request, Response } from "express";
import getData from "../services/db.service";
import runCronJob from "../services/cron.service";

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = undefined;

export const getDataHandler = async (req: any, res: any) => {
  // Access the provided 'page' and 'limit' query parameters
  const page = parseInt(req.query.p);
  const limit = parseInt(req.query.l);

  const results = await getData(
    isNaN(limit) ? DEFAULT_LIMIT : limit,
    isNaN(page) ? DEFAULT_PAGE : page
  );

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(results);
};

export const getCronHandler = async (req: any, res: any) => {
  const data = await runCronJob();
  console.log("cron data:", data);
  return res.send(data);
};
