export type SearchType = {
    city: string;
    country: string;
}

export type Country = {
    code: string;
    name: string;
}

// Tipar Resultados de una API - Asignar Type
//veo la respuesta que estoy obteniendo de la API y entonces defino el tipo de dato que voy a recibir
//desventaja - es malo castear el type que es el - await axios<Weather>(weatherUrl) - <generic>  porque no sabemos si la API va a cambiar en el futuro y entonces no va a funcionar
//existen otras maneras de comprobar si lo que le estoy pasando es correcto
// export type Weather = {
//     name: string;
//     main: {
//         temp: number;
//         temp_max: number;
//         temp_min: number;
//     }; 
// } | null; // El tipo Weather puede ser null si no se encuentra el clima


export type Weather = {
    name: string;
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    }; 
}