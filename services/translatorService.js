const { Translate } = require('@google-cloud/translate').v2;
// const translate = new Translate({key: process.env.GOOGLE_TRANSLATE_API_KEY});

const translate = {translate: (name,target) => {
  return [name]
} }
const translateFarmers = async (farmers, targetLanguage) => {
  try {
    const translatedFarmers = [];

    for (const farmer of farmers) {
      // Translate the farmer name
      const [nameTranslation] = await translate.translate(farmer.farmer_name, targetLanguage);

      // Translate the state name
      const [stateTranslation] = await translate.translate(farmer.state_name, targetLanguage);

      // Translate the district name
      const [districtTranslation] = await translate.translate(farmer.district_name, targetLanguage);

      // Translate the village name
      const [villageTranslation] = await translate.translate(farmer.village_name, targetLanguage);

      // Create a new farmer object with camelCase keys and translated values
      const translatedFarmer = {
        phoneNumber: farmer.phone_number,
        farmerName: nameTranslation,
        stateName: stateTranslation,
        districtName: districtTranslation,
        villageName: villageTranslation,
        language: targetLanguage
      };

      // Add the translated farmer to the array
      translatedFarmers.push(translatedFarmer);
    }

    return translatedFarmers;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to translate farmers');
  }
};

module.exports = { translateFarmers };
