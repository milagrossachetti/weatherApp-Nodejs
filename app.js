require('dotenv').config();
require('colors');
const {inquirerMenu,
    pause,
    readInput,
    listPlaces
} = require('./helpers/inquirer');
const Searches = require('./models/searches.js');

const main = async() => {
    const searches = new Searches();
    let opt;
    do{
       opt = await inquirerMenu();
       switch(opt){
           case 1:
                //mostrar mensaje indicando ingresar la ciudad a buscar
                const place = await readInput('City: ');
                //buscar lugar mediante una api
                const places = await searches.city(place);
                //mostrar opciones
                const idSelect = await listPlaces(places);
                if(idSelect === '0') continue;
                const placeSelect = places.find(place => place.id === idSelect);
                searches.addHistory(placeSelect.name);
                //mostrar los datos del clima del lugar seleccionado
                const weather = await searches.climatePlace(placeSelect.lat, placeSelect.lng);
                console.clear();
                console.log('\nCity information\n'.brightWhite.bgMagenta);
                console.log('\tCity:'.black.bgWhite, placeSelect.name);
                console.log('\tLatitude:'.black.bgWhite, placeSelect.lat);
                console.log('\tLongitude:'.black.bgWhite, placeSelect.lng);
                console.log('\tTemperature:'.black.bgWhite, weather.temp);
                console.log('\tMin: '.black.bgWhite, weather.min);
                console.log('\tMax:'.black.bgWhite, weather.max);
               break;
            case 2:
                searches.historyCapitalized.forEach((place, i) => {
                    const idx = `${i+1}.`.brightMagenta;
                    console.log(`${idx} ${place}`);
                })
                break;
       }
       await pause();
    }while(opt !== 0);
}

main();