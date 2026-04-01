const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const zipcodes = require('zipcodes');

const inputFilePath = path.join(__dirname, 'Zip_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv');
const outputFilePath = path.join(__dirname, 'client', 'public', 'az_prices.json');

const results = [];

console.log('Processing Zillow Dataset...');

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (data) => {
    // Only process Arizona state
    if (data.State === 'AZ') {
      const zipCode = data.RegionName;

      // The keys of the data object will contain all the columns.
      // The date columns look like '2000-01-31', '2020-05-31', etc.
      // Let's get the keys, filter by those matching a date regex (or just take the last key)
      const keys = Object.keys(data);
      const dateKeys = keys.filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key));

      // Get the latest date
      const latestDateKey = dateKeys[dateKeys.length - 1];

      // Get the price, convert to number
      const priceStr = data[latestDateKey];
      const price = parseFloat(priceStr);

      if (!isNaN(price)) {
        const zipInfo = zipcodes.lookup(zipCode);
        if (zipInfo) {
          results.push({
            zip: zipCode,
            city: data.City,
            price: price,
            lat: zipInfo.latitude,
            lng: zipInfo.longitude
          });
        }
      }
    }
  })
  .on('end', () => {
    fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
    console.log(`Successfully generated ${outputFilePath} with ${results.length} markers.`);
  });
