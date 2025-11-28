
require('dotenv').config();           // loads .env
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true // if you send cookies/auth
}));

app.use(express.json()); // parse JSON bodies

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => res.send(`Task Manager App is running at ${PORT}`));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

