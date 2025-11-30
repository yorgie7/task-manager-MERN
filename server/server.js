
require('dotenv').config();           // loads .env
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
// origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },

app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // allow cookies/auth
}));

app.use(express.json());

// Connect to MongoDB
const MongoDB_Url = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}/${process.env.DB_NAME}${process.env.DB_PARAMS}`;

connectDB(MongoDB_Url);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Health check


app.get('/', (req, res) => res.send(`Task Manager App is running at ${PORT}`));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

