import thunderstormAnimation from './Animations/thunder.json';
import drizzleAnimation from './Animations/drizzle.json';
import rainLightAnimation from './Animations/light-rain.json';
import rainModerateAnimation from './Animations/moderate-rain.json';
import rainHeavyAnimation from './Animations/heavy-rain.json';
import snowLightAnimation from './Animations/light-snow.json';
import snowModerateAnimation from './Animations/moderate-snow.json';
import snowHeavyAnimation from './Animations/heavy-snow.json';
import mistAnimation from './Animations/cloudy.json';
import smokeAnimation from './Animations/cloudy.json';
import hazeAnimation from './Animations/cloudy.json';
import dustAnimation from './Animations/cloudy.json';
import partlyCloudyDayAnimation from './Animations/partly-cloudy-day.json';
import partlyCloudyNightAnimation from './Animations/partly-cloudy-night.json';
import clearSkyDayAnimation from './Animations/clear-day.json';
import clearSkyNightAnimation from './Animations/clear-night.json';
import cloudsAnimation from './Animations/cloudy.json';

// Mapping of weather condition IDs to Animations using OpenWeatherMap's Weather-Conditions
// https://openweathermap.org/weather-conditions
const weatherAnimationMap = {
  // Thunderstorm
  200: thunderstormAnimation, // thunderstorm with light rain 
  201: thunderstormAnimation, // thunderstorm with rain 
  202: thunderstormAnimation, // thunderstorm with heavy rain 
  210: thunderstormAnimation, // light thunderstorm 
  211: thunderstormAnimation, // thunderstorm 
  212: thunderstormAnimation, // heavy thunderstorm 
  221: thunderstormAnimation, // ragged thunderstorm 
  230: thunderstormAnimation, // thunderstorm with light drizzle 
  231: thunderstormAnimation, // thunderstorm with drizzle 
  232: thunderstormAnimation, // thunderstorm with heavy drizzle 

  // Drizzle
  300: drizzleAnimation, // light intensity drizzle 
  301: drizzleAnimation, // drizzle
  302: drizzleAnimation, // heavy intensity drizzle 
  310: drizzleAnimation, // light intensity drizzle rain 
  311: drizzleAnimation, // drizzle rain 
  312: drizzleAnimation, // heavy intensity drizzle rain 
  313: drizzleAnimation, // shower rain and drizzle 
  314: drizzleAnimation, // heavy shower rain and drizzle 
  321: drizzleAnimation, // shower drizzle 

  // Rain
  500: rainLightAnimation, // light rain 
  501: rainModerateAnimation, // moderate rain 
  502: rainHeavyAnimation, // heavy intensity rain 
  503: rainHeavyAnimation, // very heavy rain 
  504: rainHeavyAnimation, // extreme rain 
  511: rainHeavyAnimation, // freezing rain 
  520: rainLightAnimation, // light intensity shower rain 
  521: rainModerateAnimation, // shower rain 
  522: rainHeavyAnimation, // heavy intensity shower rain 
  531: rainHeavyAnimation, // ragged shower rain 

  // Snow
  600: snowLightAnimation, // light snow
  601: snowModerateAnimation, // snow
  602: snowHeavyAnimation, // heavy snow 
  611: snowLightAnimation, // sleet
  612: snowLightAnimation, // light shower sleet 
  613: snowModerateAnimation, // shower sleet 
  615: snowLightAnimation, // light rain and snow 
  616: snowModerateAnimation, // rain and snow 
  620: snowLightAnimation, // light shower snow 
  621: snowModerateAnimation, // shower snow 
  622: snowHeavyAnimation, // heavy shower snow 

  // Atmosphere
  701: mistAnimation, // mist
  711: smokeAnimation, // smoke 
  721: hazeAnimation, // haze
  731: dustAnimation, // sand/dust whirls 
  741: mistAnimation, // fog
  751: dustAnimation, // sand
  761: dustAnimation, // dust
  762: dustAnimation, // volcanic ash 
  771: mistAnimation, // squalls
  781: mistAnimation, // tornado

  // Clear
  8001: clearSkyDayAnimation, // clear sky 
  8002: clearSkyNightAnimation, // clear sky 

  // Clouds
  8011: partlyCloudyDayAnimation, // few clouds: 11-25% 
  8012: partlyCloudyNightAnimation, // few clouds: 11-25% 
  8021: partlyCloudyDayAnimation, // scattered clouds: 25-50% 
  8022: partlyCloudyNightAnimation, // scattered clouds: 25-50% 
  803: cloudsAnimation, // broken clouds: 51-84%  
  804: cloudsAnimation, // broken clouds: 85-100% 
};

export default weatherAnimationMap;