
require('dotenv').config();           // loads .env
const express = require('express');


const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json()); // parse JSON bodies

const PORT = process.env.PORT || 3000;

// Connect to MongoDB (very simple)
connectDB(process.env.MONGO_URI);


// Routes - minimal

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);


// Health check

app.get('/', (req, res) => res.send('App running'));

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

