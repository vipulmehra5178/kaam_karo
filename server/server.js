const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


connectDb();

app.get('/',(req,res) => {
    res.send("API is running ...");
});



app.use('/api/auth',authRoutes);

app.use('/api/jobs', jobRoutes);

app.use('/api/applications', applicationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});