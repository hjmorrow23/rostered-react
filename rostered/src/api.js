const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('rostered_5b575f0fe4b0cc90667ba640', '7a8e758a-719d-481c-96d6-6f1a2fb975e6');
var unirest = require('unirest');

rapid.call('NasaAPI', 'getPictureOfTheDay', {});

export default unirest;
