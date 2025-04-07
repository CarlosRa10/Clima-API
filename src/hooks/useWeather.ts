import axios from 'axios'//axios es una librería que permite hacer peticiones HTTP de manera más sencilla que fetch
import { SearchType } from '../types'

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
            const {data:weatherResult}= await axios.get(weatherUrl)//axios.post hace una petición POST a la URL weatherUrl y espera la respuesta -weatherResult es un objeto que contiene la respuesta de la API
            console.log(weatherResult)//data es un objeto que contiene la respuesta de la API
        } catch (error) {
            console.log(error)
            
        }
    }
    return{
        fetchWeather
    }
 }