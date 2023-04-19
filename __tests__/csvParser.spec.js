const parseCSV = require('../src/utils/csvParser');
const fs = require('fs');
console.log(__dirname);

describe('parseCSV', () => {
  test('it should parse a CSV file and return an array of Farmers', async () => {
    const csvFile = fs.createReadStream(__dirname +'/mock/test.csv');
    const farmers = await parseCSV(csvFile);
    expect(farmers).toHaveLength(4);
    expect(farmers[0]).toHaveProperty('phone_number');
    expect(farmers[0]).toHaveProperty('farmer_name');
    expect(farmers[0]).toHaveProperty('state_name');
    expect(farmers[0]).toHaveProperty('district_name');
    expect(farmers[0]).toHaveProperty('village_name');
    expect(farmers[0]).toHaveProperty('createdAt');
    expect(farmers[0]).toHaveProperty('updatedAt');
  });
});
