const csvParser = require('../utils/csvParser');
const translatorService = require('../services/translatorService');
const Farmer = require('../models/Farmer');

exports.uploadAndTranslateFarmers = async (req, res, next) => {
    try {
        const csvFile = req.file;
        const farmers = await csvParser(csvFile);
        const translation = await translatorService.translateFarmers(farmers);
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
    } catch (error) {
        next(error);
    }
};