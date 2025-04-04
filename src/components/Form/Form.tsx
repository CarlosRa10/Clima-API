import { ChangeEvent, FormEvent, useState } from "react";
import { SearchType } from "../../types";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import Alert from "../Alert/Alert";

export default function Form() {
    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: ""
    });

    const [alert, setAlert] = useState('')

    //el elemento lo lees desde el name del input o select
    //el value lo lees desde el value del input o select
    //handleChange es una función que se ejecuta cuando el usuario cambia el valor de un input o select
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            //hacemos una copia del estate
            ...search,//...search copia las propiedades actuales del estado ({city: "", country: ""})
            //actualizamos el valor del input o select que cambió
            //e.target.name = "city" o "country" (porque el input y select tiene name="city" name="country")
            //[e.target.name] usa el nombre del input como clave para actualizar el estado
            [e.target.name]: e.target.value//e.target.value asigna el nuevo valor :Ejemplo - cada letra que vaya ingresando ("M") 
        });
    }
    
    //Para extraer información de una API tengo que mandarle ciertos datos.... a esto se le conoce como una petición
    //La función recibe un evento e de tipo FormEvent específico para elementos <form>
    //El tipado HTMLFormElement indica que el objetivo del evento es un formulario 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { //Es necesario la validación de los datos antes de enviar la petición a la API
        e.preventDefault();//evita que la página se recargue al enviar el formulario / Previene el comportamiento por defecto de un formulario HTML (que es recargar la página al enviarse)
        if(Object.values(search).includes("")) {// Convierte los valores del objeto search en un array y verifica si hay algún valor vacío
            //Si hay algún valor vacío, muestra una alerta y no envía el formulario
            //console.log("Por favor complete todos los campos");
            setAlert("Por favor complete todos los campos");//Esto causa un re-render del componente
            return;
        }
     }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
          {/* Si alert tiene un valor truthy, se muestra el componente <Alert></Alert>       */}
          {/* El contenido de <Alert> será el valor actual de alert*/}
          {/* El contenido de alert se pasa como children al componente Alert.tsx*/}
          {/* Paso de props: <Alert>{alert}</Alert> equivale a - <Alert children={alert} />*/}
                {alert && <Alert>{alert}</Alert>}
                <div className={styles.field}>
                    <label htmlFor="city">Ciudad:</label>
    {/*El input tiene un atributo name="city" que coincide con la propiedad del estado - El value está vinculado a search.city-  El evento onChange llama a handleChange cuando el valor cambia */}  
                    <input 
                        id="city"
                        type="text"
                        name="city"
                        placeholder="Ciudad"
                        value={search.city}//El input ahora muestra "lo que escribimos" porque su value está vinculado al value de search.city
                        onChange={handleChange}//llama a handleChange cuando el valor cambia , guarda el valor en el estado y luego lo muestra en el input
                    />
                </div>
                

                <div className={styles.field}>
                    <label htmlFor="country">País:</label>
                    <select
                        id="country"
                        value={search.country}
                        name="country"
                        onChange={handleChange}
                    >
                        <option value="">--- Seleccione un País ---</option>
                        {countries.map(country=>(
                            <option
                            key={country.code}
                            value={country.name}
                            >{country.name}</option>
                        ))}
                    </select>
                </div>

            <input className={styles.submit} type="submit" value='Consultar Clima'/>
        </form>
    )
    }
