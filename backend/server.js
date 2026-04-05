require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client (server-side, uses service role key for admin operations)
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(path.join(__dirname)));

// ───────────────────────────────────────────────
// AUTH API ROUTES
// ───────────────────────────────────────────────

// POST /api/auth/signup
// Body: { email, password, firstName, lastName }
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: false, // Supabase will send verification email
            user_metadata: { first_name: firstName, last_name: lastName }
        });
        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: 'Account created. Please verify your email before logging in.', user: data.user });
    } catch (err) {
        res.status(500).json({ error: 'Server error during signup.' });
    }
});

// POST /api/auth/login
// Body: { email, password }
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    // Login is handled client-side with the anon key; this route is a passthrough
    // example if you wanted to verify server-side.
    res.json({ message: 'Use the client-side Supabase SDK for authentication.' });
});

// POST /api/auth/reset-password
// Body: { email }
app.post('/api/auth/reset-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });
    // Password reset is handled via the client-side Supabase SDK.
    // This route can be used for logging/rate-limiting if needed.
    res.json({ message: 'Please use the frontend Supabase client to trigger a password reset email.' });
});

// GET /api/health - health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Fallback: serve index.html for any non-API route (SPA-style)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`   Supabase URL: ${process.env.SUPABASE_URL || '(not set – update .env)'}`);
});
