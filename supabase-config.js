// ─────────────────────────────────────────────────────────────
// Supabase Frontend Configuration
// ─────────────────────────────────────────────────────────────
// Find your credentials at: https://app.supabase.com
// Project Settings -> API
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://smqeodwocruftbpbrtub.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcWVvZHdvY3J1ZnRicGJydHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTYxODQsImV4cCI6MjA4OTc3MjE4NH0.2Fbk0Qoh9Jk6F7xGoy1mAAH2notEygzCmyQmYwX8FkA';

// Initialize the Supabase client (uses the UMD global `supabase` from CDN)
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase client initialized.');
