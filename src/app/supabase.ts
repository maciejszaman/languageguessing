import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  "https://skqusswcqbowqebbryyz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcXVzc3djcWJvd3FlYmJyeXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDYyNjksImV4cCI6MjAxNjQyMjI2OX0.1Zk4ILNfViWNy7Fkjjvl3LTlf3AMLuyYmV7ciFNdjis"
);

export default supabase;
