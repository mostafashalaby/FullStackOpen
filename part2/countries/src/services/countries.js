import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getCountryData = ({country}) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getWeatherData = ({access_key, query}) => {
  const header = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`
  const request = axios.get(header)
  return request.then(response => response.data)
}

export default { getAll, getCountryData, getWeatherData}
