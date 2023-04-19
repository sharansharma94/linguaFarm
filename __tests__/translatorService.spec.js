const { Translate } = require('@google-cloud/translate').v2;
const sinon = require('sinon');
const supportedLanguages = require('../src/config/languages');
const translatorService = require('../src/services/translatorService');

// Mock the translate function
const mockTranslate = sinon.stub(Translate.prototype, 'translate');
mockTranslate.callsFake(async (text, targetLanguage) => `${text} - ${targetLanguage}`);

describe('translatorService', () => {
  describe('translateFarmers', () => {
    it('should translate all farmer data to supported languages', async () => {
      const farmers = [
        {
          phone_number: '1234567890',
          farmer_name: 'John Doe',
          state_name: 'California',
          district_name: 'Los Angeles',
          village_name: 'Beverly Hills',
        },
      ];

      const translations = await translatorService.translateFarmers(farmers);
      expect(translations).toHaveLength(farmers.length * supportedLanguages.length);
    });

    it('should throw an error if translation fails', async () => {
      const farmers = [{ phone_number: '1234567890', farmer_name: 'John Doe' }];
      mockTranslate.callsFake(() => {
        throw new Error('Translation failed');
      });

      await expect(translatorService.translateFarmers(farmers)).rejects.toThrowError('Failed to translate farmers');
    });
  });
});

// Restore the mock
mockTranslate.restore();
