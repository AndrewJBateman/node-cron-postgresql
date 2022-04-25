import { createClient } from "@supabase/supabase-js";
import config from "config";

const dbUrl = config.get<string>("dbUrl");
const dbKey = config.get<string>("dbKey");
const dbTableName = config.get<string>("dbTableName");
const supabase = createClient(dbUrl, dbKey);
const tableName = dbTableName;

// get data from database
const getData = async (limit: any, offset = 0) => {
  const request = await supabase
    .from(tableName)
    .select("*")
    .order("date", { ascending: false })
    .range(offset, offset + (limit - 1));

  if (request.error) {
    throw new Error(request.error.message);
  }

  return request.data;
};

export default getData;
