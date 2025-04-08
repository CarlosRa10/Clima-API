import styles from './App.module.css'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

// del hooks useWeather.tsx extraemos la función fetchWeather y la pasamos como prop al componente Form.tsx

function App() {
  //Extraemos la función fetchWeather de useWeather
  // todo esto es lo que exportando de useWeather.tsx
  const {weather,loading, fetchWeather, hasWeatherData} = useWeather()
  
  return (
    <>
      <h1 className={styles.title}>Hola Vite + React + TypeScript + CSS Modules!</h1>

      <div className={styles.container}>

        <Form
          fetchWeather={fetchWeather} //Pasamos la función fetchWeather como prop
        />

        {/* Si loading es true entonces mostramos el mensaje de Cargando... */}
        {loading && <Spinner />}

        {/* Si hasWeatherData es true entonces mostramos el componente WeatherDetail */}
        {hasWeatherData &&  <WeatherDetail weather={weather} />}

      </div>
    </>
  )
}

export default App
