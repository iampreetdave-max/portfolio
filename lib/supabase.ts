import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (url && key) {
      _client = createClient(url, key);
    } else {
      // Return a dummy client that will fail gracefully
      _client = createClient("https://placeholder.supabase.co", "placeholder");
    }
  }
  return _client;
}
