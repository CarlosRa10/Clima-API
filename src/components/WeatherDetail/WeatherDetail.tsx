import { Weather } from "../../hooks/useWeather"

type WeatherDetailProps = {
    weather: Weather
}


//extraemos weather de WeatherDetailProps
export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div>WeatherDetail</div>
  )
}
