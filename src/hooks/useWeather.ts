import axios from 'axios'//axios es una librería que permite hacer peticiones HTTP de manera más sencilla que fetch
import { SearchType } from '../types'

export default function useWeather() {
    
    //función que va a consultar el clima -  fetch(buscar el clima)
    //fetchWeather toma una busqueda de tipo SearchType como argumento y devuelve una promesa que resuelve en un objeto de tipo Weather
    const fetchWeather = async (search: SearchType) => {
        //console.log('Consultando...')

        const appId = ''//API key de OpenWeatherMap

        try {

            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`
            //console.log(geoUrl)
            const {data}= await axios.get(geoUrl)//axios.get hace una petición GET a la URL geoUrl y espera la respuesta
            console.log(data)//data es un objeto que contiene la respuesta de la API
        } catch (error) {
            console.log(error)
            
        }
    }
    return{
        fetchWeather
    }
 }