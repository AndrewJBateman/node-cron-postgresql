import config from "config";
import supabase from "./supabase.service";

const dbTableName = config.get<string>("dbTableName");
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
