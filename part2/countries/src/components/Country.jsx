import { useState, useEffect } from 'react'
import countriesService from '../services/countries'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const access_key = import.meta.env.VITE_SOME_KEY
        const query = country.capital

        console.log(access_key, query)
        countriesService
            .getWeatherData({access_key, query})
            .then(weatherData => {
                console.log(weatherData)
                setWeather(weatherData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p><i>Capital:</i> {country.capital}</p>
            <p><i>Population:</i> {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            {weather && (
                <>
                    <h2>Weather in {country.capital}</h2>
                    <p><i>Temperature:</i> {weather.current.temperature} Celsius</p>
                    <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} />
                    <p><i>Wind:</i> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                </>
            )}
        </div>
    )
}

export default Country