require('dotenv').config();

async function getCityCoordinates(cityName) {
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            const { coord } = data;
            const { lat, lon } = coord;
            return { latitude: lat, longitude: lon };
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

async function getCurrentWeather(latitude, longitude) {
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            const { main, weather } = data;
            const { feels_like } = main;
            const { description } = weather[0];
            return { feelsLike: feels_like, description };
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

async function main() {
    const cityName = process.env.CITY_NAME;
    const coordinates = await getCityCoordinates(cityName);
    console.log(`Coordenadas de ${cityName}:`);
    console.log(`+ Latitude: ${coordinates.latitude}`);
    console.log(`+ Longitude: ${coordinates.longitude}`);
    const condition = await getCurrentWeather(coordinates.latitude, coordinates.longitude);
    console.log(`Clima em ${cityName}:`);
    console.log(`+ Sensação térmica: ${condition.feelsLike} K`);
    console.log(`+ Descrição: ${condition.description}`);
}

main()
