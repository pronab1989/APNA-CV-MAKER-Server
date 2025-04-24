const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const resumeRoutes = require('./routes/resume');

const app = express();
// Add below other middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB connection error:', err));

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
