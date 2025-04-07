import axios from 'axios'//axios es una librería que permite hacer peticiones HTTP de manera más sencilla que fetch
import { SearchType, Weather } from '../types'

//TYPE GUARD O ASSERTION - comprobar la respuesta de una API sin librerias
// Verifica si el objeto tiene las propiedades esperadas
// esta funcion va a revisar que el clima contenga el objeto que nosotros estamos buscando 
//unknown - es un tipo de dato que no sabemos que es - puede ser cualquier cosa - es mejor usar unknown que any porque any no te avisa si hay un error y unknown si te avisa
function isWeatherResponse(weather:unknown): weather is Weather { //el weather is Weather significa que weather es del tipo Weather - es un type guard - es una función que verifica si el objeto que le estamos pasando es del tipo Weather
    return (
        // Se coloca los && porque todas las condiciones tienen que ser verdaderas para que se ejecute el código
        Boolean(weather) && //verifica que el objeto no sea null o undefined - Verifica que le estamos pasando un objeto y no un string o un number
        typeof weather === 'object' && // typeof es un operador que devuelve el tipo de dato de una variable
        typeof (weather as Weather).name === 'string' && //verifica que el objeto tenga la propiedad name y que sea un string
        typeof (weather as Weather).main.temp === 'number' && //verifica que el objeto tenga la propiedad main y que sea un objeto
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number' 
        //Primero comprobamos que weather exista y que sea un objeto, luego comprobamos que tenga la propiedad name y que sea un string, y finalmente comprobamos que tenga la propiedad main y que sea un objeto con las propiedades temp, temp_max y temp_min como números.
    )
    //Desventajas - no es codigo mantenible - si respuesta es grande la función tambien
    //Desventajas - si tengo 5 apis diferentes y cada una tiene un objeto diferente, tengo que crear una función para cada una de ellas - no es escalable - no es reusable - no es mantenible - no es DRY (Don't Repeat Yourself) 
 }

export default function useWeather() {
    
    //función que va a consultar el clima -  fetch(buscar el clima)
    //fetchWeather toma una busqueda de tipo SearchType como argumento y devuelve una promesa que resuelve en un objeto de tipo Weather
    const fetchWeather = async (search: SearchType) => {
        //console.log('Consultando...')

        const appId = import.meta.env.VITE_API_KEY//API key de OpenWeatherMap

        try {
            //primer llamado a la API de OpenWeatherMap para obtener la latitud y longitud de la ciudad
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            //console.log(geoUrl)
            const {data}= await axios.get(geoUrl)//axios.get hace una petición GET a la URL geoUrl y espera la respuesta
            //console.log(data)//data es un objeto que contiene la respuesta de la API
            const lat = data[0].lat//latitud de la ciudad
            const lon = data[0].lon//longitud de la ciudad
            //console.log(lat, lon)//latitud y longitud de la ciudad
            //segundo llamado a la API de OpenWeatherMap para obtener el clima de la ciudad
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`//URL de la API de OpenWeatherMap para obtener el clima
            //console.log(weatherUrl)//URL de la API de OpenWeatherMap para obtener el clima
            //data se asigna a weatherResult - axios.get hace una petición GET a la URL weatherUrl y espera la respuesta
            
            //Castear Type <generic> - es la menos recomendada porque si colocas algo que no va, typescript no te va a avisar - es mejor usar el type guard
            // const {data:weatherResult}= await axios<weather>(weatherUrl)//axios.post hace una petición POST a la URL weatherUrl y espera la respuesta -weatherResult es un objeto que contiene la respuesta de la API
            // console.log(weatherResult)//data es un objeto que contiene la respuesta de la API


            //Type Guard - es la mejor manera de hacerlo - verificamos si el objeto que estamos recibiendo es del tipo Weather
            const {data:weatherResult}= await axios.get(weatherUrl)
            const result = isWeatherResponse(weatherResult)
            //console.log(result)//result es un booleano que indica si el objeto weatherResult es del tipo Weather
            if(result){
                console.log(weatherResult.name)//nombre de la ciudad
                
            }else{
                console.log('No se encontró el clima')
            }

        } catch (error) {
            console.log(error)
            
        }
    }
    return{
        fetchWeather
    }
 }