import styles from './App.module.css'
import Form from './components/Form/Form'
import useWeather from './hooks/useWeather'

//Extraemos la función fetchWeather de useWeather
const {fetchWeather} = useWeather()
// del hooks useWeather.tsx extraemos la función fetchWeather y la pasamos como prop al componente Form.tsx

function App() {
  
  return (
    <>
      <h1 className={styles.title}>Hola Vite + React + TypeScript + CSS Modules!</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather} //Pasamos la función fetchWeather como prop
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
