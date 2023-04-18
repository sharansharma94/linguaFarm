const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');


const Farmer = require('../models/Farmer');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');
const farmerController = require('../controllers/farmerController');

const router = express.Router();

//Endpoint for uploading and translating farmer data
router.post('/', authMiddleware, fileUploadMiddleware, farmerController.uploadAndTranslateFarmers)

//Endpoint for retrieving farmer data in a specific language
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const lang = req.query.lang;
        const farmers = await Farmer.findAll({ where: { language: lang } });
        res.json(farmers);
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;