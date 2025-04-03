import { countries } from "../../data/countries";


export default function Form() {
  return (
    <form>
        <div>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id="city"
                type="text"
                name="city"
                placeholder="Ciudad"
            />
        </div>

        <div>
            <label htmlFor="pais">País:</label>
            <select>
                <option value="">--- Seleccione un País ---</option>
                {countries.map(country=>(
                    <option
                    key={country.code}
                    value={country.name}
                    >{country.name}</option>
                ))}
            </select>
        </div>

        <input type="submit" value='Consultar Clima'/>
    </form>
  )
}
