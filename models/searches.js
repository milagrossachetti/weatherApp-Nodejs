const axios = require('axios').default;
const fs = require('fs');

class Searches {
    searchHistory = [];
    dbPath = './db/database,json';
    
    constructor(){
        this.readDB;
    }

    get historyCapitalized() {
        return this.searchHistory.map(place => {
            let words = place.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
            return words.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,  //accede a la variable de entorno que fue agregada en el archivo .env gracias a dotenv en app.js
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,  //accede a la variable de entorno que fue agregada en el archivo .env gracias a dotenv en app.js
            lang: 'en',
            units: 'metric'
        }
    }

    async city(place) {
        try{
            //peticion http
            const instace = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            const request = await instace.get();
            return request.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            })); //retornar los lugares que coicidan con la búsqueda

        } catch(error){
            return [];
        }
    }

    async climatePlace(lat, lon) {
        try{
            const instace = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });
            const request = await instace.get();
            const {main} = request.data;
            return {
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }catch(error){
            return error;
        }
    }

    addHistory(place){
        if(this.searchHistory.includes( place.toLocaleLowerCase() ) ){
            return;
        }
        this.searchHistory.unshift(place.toLocaleLowerCase());

       // this.addDB();

    }

    addDB(){
        const payload = {
            history: this.addHistory
        }

        fs.readFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if(!fs.existsSync(this.dbPath)){
            return;
        }
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.searchHistory = data.searchHistory;
    }

}

module.exports = Searches;
