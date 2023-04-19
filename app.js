const express = require('express');
const cors = require('cors');

require('dotenv').config();

const farmerRoutes = require('./src/routes/farmerRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandlerMiddleware = require('./src/middlewares/errorHandlerMiddleware');

const app = express();

app.use(cors());
app.use(express.json())

//farmer Resource
app.use('/farmers', farmerRoutes);

// authentication Resource
app.use('/auth', authRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`App is running http://localhost:${PORT}`);
})