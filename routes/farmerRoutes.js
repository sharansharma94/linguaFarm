const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const csvParser = require('../utils/csvParser');
const translatorService = require('../services/translatorService');

const Farmer = require('../models/Farmer');

const router = express.Router();

//Endpoint for uploading and translating farmer data
router.post('/', authMiddleware, async(req, res, next)=>{

    try {
        const csvFile = req.files.csvFile;
        const farmers = csvParser.parse(csvFile);
        const translation = await translatorService.translateFarmers(farmers);
        await Farmer.bulkCreate(translation);
        res.json({message: 'Farmers data uploaded and translated successfully'});
    }
    catch(err){
        next(err);
    }
})

//Endpoint for retrieving farmer data in a specific language
router.get('/',authMiddleware,async(req,res,next)=>{
    try{
        const lang = req.query.lang;
        const farmers = await Farmer.findAll({where: {language:lang}});
        res.json(farmers);
    }
    catch(err){
        next(err)
    }
})


module.exports = router;