const express = require('express');
const cors = require('cors');

require('dotenv').config();

const farmerRoutes = require('./routes/farmerRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(cors());
app.use(express.json())

//farmer Resource
app.use('/farmers', farmerRoutes);

// authentication Resource
// app.use('/auth', authRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`App is running http://localhost:${PORT}`);
})