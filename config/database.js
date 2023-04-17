const { Sequelize} = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

console.log(DB_HOST,DB_NAME,DB_PASSWORD,DB_USER)
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions:{
        ssl:false
    },
});

sequelize
    .authenticate()
    .then(()=> console.log('Database connected successfully'))
    .catch(err=> console.error('Unable to connect to the database: ', err))

module.exports = sequelize;