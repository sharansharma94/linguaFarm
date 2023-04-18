const { Translate } = require('@google-cloud/translate').v2;
const supportedLanguages = require('../config/languages');
const translate = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const translateFarmers = async (farmers) => {
  try {
    const translatedFarmers = [];

    for (const farmer of farmers) {
      // Prepare translation promises
      const translationPromises = supportedLanguages.map(async (targetLanguage) => {
        const [nameTranslation] = await translate.translate(farmer.farmer_name, targetLanguage);
        const [stateTranslation] = await translate.translate(farmer.state_name, targetLanguage);
        const [districtTranslation] = await translate.translate(farmer.district_name, targetLanguage);
        const [villageTranslation] = await translate.translate(farmer.village_name, targetLanguage);        
        const [phoneTranslation] = await translate.translate(farmer.phone_number, targetLanguage);


        return {
          ...farmer,
          farmerName: nameTranslation,
          stateName: stateTranslation,
          districtName: districtTranslation,
          villageName: villageTranslation,
          language: targetLanguage,
          phoneNumber: phoneTranslation
        };
      });

      // Wait for all translations to complete and store them
      const allTranslations = await Promise.all(translationPromises);
      translatedFarmers.push(...allTranslations);
    }

    return translatedFarmers;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to translate farmers');
  }
};



// const translateFarmers = async (farmers, targetLanguage) => {
//   try {
//     const translatedFarmers = [];

//     for (const farmer of farmers) {
//       // Translate the farmer name
//       const [nameTranslation] = await translate.translate(farmer.farmer_name, targetLanguage);

//       // Translate the state name
//       const [stateTranslation] = await translate.translate(farmer.state_name, targetLanguage);

//       // Translate the district name
//       const [districtTranslation] = await translate.translate(farmer.district_name, targetLanguage);

//       // Translate the village name
//       const [villageTranslation] = await translate.translate(farmer.village_name, targetLanguage);

//       // Create a new farmer object with camelCase keys and translated values
//       const translatedFarmer = {
//         phoneNumber: farmer.phone_number,
//         farmerName: nameTranslation,
//         stateName: stateTranslation,
//         districtName: districtTranslation,
//         villageName: villageTranslation,
//         language: targetLanguage
//       };

//       // Add the translated farmer to the array
//       translatedFarmers.push(translatedFarmer);
//     }

//     return translatedFarmers;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to translate farmers');
//   }
// };

module.exports = { translateFarmers };
