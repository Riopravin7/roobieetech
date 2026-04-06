require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client (server-side)
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors({
    origin: '*'
    // Later replace * with your frontend URL for security
    // origin: 'https://your-frontend.vercel.app'
}));
app.use(express.json());

// Serve static frontend files from the website root (one level up from backend/)
const rootDir = path.join(__dirname, '..');
app.use(express.static(rootDir));

// ───────────────────────────────────────────────
// AUTH API ROUTES
// ───────────────────────────────────────────────

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: false,
            user_metadata: {
                first_name: firstName,
                last_name: lastName
            }
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({
            message: 'Account created. Please verify your email before logging in.',
            user: data.user
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error during signup.' });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    res.json({ message: 'Use the client-side Supabase SDK for authentication.' });
});

// POST /api/auth/reset-password
app.post('/api/auth/reset-password', async (req, res) => {
    res.json({ message: 'Please use the frontend Supabase client to trigger a password reset email.' });
});

// GET /api/health
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
});

// Catch-all: any unmatched route (e.g. OAuth redirects) sends index.html
// Supabase appends #access_token or ?code= to the URL — index.html handles it
app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});