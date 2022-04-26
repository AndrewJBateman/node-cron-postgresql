import { createClient } from "@supabase/supabase-js";
import config from "config";

const dbUrl = config.get<string>("dbUrl");
const dbKey = config.get<string>("dbKey");

const supabase = createClient(dbUrl, dbKey);

export default supabase;
