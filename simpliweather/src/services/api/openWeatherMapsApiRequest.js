const OPENWEATHERMAP_API_KEY = '5bf97fa185827f27b33f40ee4839ae57';

/**
 * Function to fetch weather data from OpenWeatherMap's 3.0 API
 * @param {number} lat - Latitude of the location
 * @param {number} lon - Longitude of the location
 * @param {string} scale - string that represents the scale that should be used
 * @returns {Promise<object>} - Returns the weather data response from OpenWeatherMap
 */
const fetchWeatherData = async (lat, lon, scale) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=${scale}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

/**
 * Function to fetch weather data for a specific location in the list
 * @param {Array} locations - The list of locations (with lat/lon)
 * @param {string} id - The id of the location in the list to fetch weather data for
 * @param {string} scale = String that represents the scale that should be used
 * @returns {Promise<object>} - Returns the weather data response from OpenWeatherMap
 */
const fetchWeatherDataForLocation = async (locations, id, scale) => {
    if (!locations || locations.length === 0 || !id) {
        throw new Error('Invalid index or empty locations list');
    }

    const location = locations.find(
        (location) => location.id === id
    );

    const { lat, lon } = location;

    return await fetchWeatherData(lat, lon, scale); 
};

export { fetchWeatherDataForLocation, fetchWeatherData };