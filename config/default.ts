require("dotenv").config();

export default {
  dbUrl: process.env.SUPABASE_URL,
  dbKey: process.env.SUPABASE_KEY,
  dbTableName: process.env.SUPABASE_TABLE_NAME,
  port: 3000
}