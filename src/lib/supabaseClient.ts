import { createClient } from "@supabase/supabase-js";
import { SUP_KEY, SUP_URL } from "./env";

const supabaseURL = SUP_URL

const supabaseKey = SUP_KEY

export const supabase = createClient(supabaseURL,supabaseKey)