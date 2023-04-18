const csv = require('csv-parser');
const fs = require('fs');
const Farmer = require('../models/Farmer');

function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          phone_number: data.phone_number,
          farmer_name: data.farmer_name,
          state_name: data.state_name,
          district_name: data.district_name,
          village_name: data.village_name,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = parseCSV; 