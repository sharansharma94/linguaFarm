const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const csvParser = require('../utils/csvParser');
const translatorService = require('../services/translatorService');

const Farmer = require('../models/Farmer');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

//Endpoint for uploading and translating farmer data
router.post('/', authMiddleware, fileUploadMiddleware, async (req, res, next) => {

    try {
        const csvFile = req.file;
        const farmers = await csvParser(csvFile);
        const translation = await translatorService.translateFarmers(farmers, 'es');
        await Farmer.bulkCreate(translation.map((farmer) => ({
            phoneNumber: farmer.phoneNumber,
            farmerName: farmer.farmerName,
            stateName: farmer.stateName,
            districtName: farmer.districtName,
            villageName: farmer.villageName,
            language: farmer.language,
            createdAt: new Date(),
            updatedAt: new Date()
        })));

        res.json({ message: 'Farmers data uploaded and translated successfully' });
    }
    catch (err) {
        console.error('Error importing and translating CSV data:', err.message);
        next(err);
    }
})

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