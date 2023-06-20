const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid=693c1dfb63570894f2988b921bda7dad&lang=ja&units=metric'

    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch weather: ${error}`);
        }
    }
    export default fetchWeather