import { useState } from "react";
import WeatherData from "./WeatherData";

// DisplayInfo is:
//   - [string]

const CountryDisplay = ({displayInfo}) => {

    const infoSize = displayInfo.length;

    if (infoSize <= 0) 
        return 'No match found, specify another filter';
    else if (infoSize === 1)
        return <CountryInfo value={displayInfo} />;
    else if (infoSize > 1 && infoSize <= 10)
        return <CountryList values={displayInfo} />;
    else  
        return 'Too many matches, specify another filter';
};

const CountryList = ({values}) => {
    console.log(values);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const style = {
        padding: 0,
        listStyleType: 'none',
        marginTop: 0
    }

    const handleShow = (i) => {
        console.log(values[i]);
        setSelectedCountry(values[i]);
    }
    const countryNames = values.map(country => `${country.name.common}`);
    return (
        <div>
            <ul style={style}>
                {countryNames.map((item, i) => {
                    return (
                        <li key={i}>
                            {item}
                            <button onClick={() => handleShow(i)}>show</button>
                        </li> 
                    );
                })}
                { selectedCountry && <CountryInfo value={[selectedCountry]} />}
            </ul>

        </div>
    );
}

const CountryInfo = ({value}) => {
    const country = value[0];
    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital} <br />
            area {country.area}

            <h3>languages: </h3>
            <ul>
                {Object.values(country.languages).map((lang, i) => {
                    return (<li key={i} >{lang}</li>);
                })}
            </ul>
            <br />
            <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
            { 
                country.capital ? 
                <WeatherData city={country.capital} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]}/> :
                <h2>No capital city found for {country.name.common} </h2>
            }
        </div>
    );
    
}

export default CountryDisplay;