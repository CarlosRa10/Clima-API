import styles from './App.module.css'
import Form from './components/Form/Form'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

// del hooks useWeather.tsx extraemos la función fetchWeather y la pasamos como prop al componente Form.tsx

function App() {
  //Extraemos la función fetchWeather de useWeather
  const {weather, fetchWeather} = useWeather()
  
  return (
    <>
      <h1 className={styles.title}>Hola Vite + React + TypeScript + CSS Modules!</h1>

      <div className={styles.container}>

        <Form
          fetchWeather={fetchWeather} //Pasamos la función fetchWeather como prop
        />

        <WeatherDetail
          weather={weather} //Pasamos el objeto weather como prop
        />

      </div>
    </>
  )
}

export default App
