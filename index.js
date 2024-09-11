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

async function main() {
    const cityName = process.env.CITY_NAME;
    const coordinates = await getCityCoordinates(cityName);
    console.log(`Coordenadas de ${cityName}:`);
    console.log(`Latitude: ${coordinates.latitude}`);
    console.log(`Longitude: ${coordinates.longitude}`);
}

main()
