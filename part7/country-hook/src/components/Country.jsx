const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
        <div>
            not found...
        </div>
        )
    }

    console.log(country.data)

    return (
        <div>
        <h3>{country.data.name.offical} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div> 
        <img src={country.data.flags.png} alt={country.data.name.common} />
        </div>
    )
}

export default Country