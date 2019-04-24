/************************************************************************
 * Language transition helper file
 * This helper file used to load language files
 * Also provide helper functions to trasalate text to differet languages
 * 
 * Author: 
 * Created On: 
 ************************************************************************/
const _ = require('lodash');

// List of all supported languages
const languageList = ['en', 'ar'];
let langData = {};


// Load all language files upfront - This will execute only once
const LoadFile = () => {
	if(_.isEmpty(langData)) {
		languageList.forEach(function(language) {
			langData[language] = require(`${__dirname}/../i18n/${language}.json`);
		});
	}
	return langData;
};

// Language switch function - also support template strings
const text = (text = '', language = 'en', data = {}) => {
	const jsonData = LoadFile();
	
	const compiled = _.template(jsonData[language][text] || text);
	return compiled(data);
};

// Function to pick english/arabic text depends on the request
const pick = (language = 'en', textEn = '', textAr) => {
	return (language === 'ar' && textAr != null) ? textAr : textEn;
};

module.exports = { languageList, text, pick };
