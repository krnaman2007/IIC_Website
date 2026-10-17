// server.js
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport'; // 1. Import Passport
import cors from 'cors';
import connectDB from './config/db.js';

// 2. Import your Passport Config Function
import passportConfig from './config/passport.js';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

const isAllowedBackendOrigin = (origin) => {
    if (!origin) return true;
    const clean = origin.replace(/\/+$/, "");
    const allowed = [
        "https://iic-website-eight.vercel.app",
        "https://iic-website-azure.vercel.app",
        "https://iic.mnnit.ac.in",
        "http://210.212.49.57",
    ];
    if (allowed.includes(clean)) return true;
    if (/^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/i.test(clean)) return true;
    if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(clean)) return true;
    return false;
};

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        if (isAllowedBackendOrigin(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());

// 3. Initialize Passport
app.use(passport.initialize());

// 4. RUN THE CONFIGURATION (This fixes your error)
passportConfig(passport);

// 5. Routes (Must come AFTER step 4)
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/teams', teamRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
