require("dotenv").config();
const dbUrl = process.env.SUPABASE_URL;
const dbKey = process.env.SUPABASE_KEY;
const dbTableName = process.env.SUPABASE_TABLE_NAME
export default {
  port: 3000
}