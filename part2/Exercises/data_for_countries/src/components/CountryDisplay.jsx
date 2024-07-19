
// DisplayInfo is:
//   - [string]
// ASSUME: the list wont be empty

const CountryDisplay = ({displayInfo}) => {

    const infoSize = displayInfo.length;
    let valueToDisplay;

    if (infoSize === 0) 
        valueToDisplay = ['No match found, specify another filter'];
    else if (infoSize > 1 && infoSize <= 10) 
        valueToDisplay = displayInfo.map(country => `${country.name.common}`);
    else if (infoSize > 10) 
        valueToDisplay = ['Too many matches, specify another filter'];
    
    if (infoSize === 1)
        return <CountryInfo value={displayInfo}/>;
    return <CountryList value={valueToDisplay} />;
};

const CountryList = ({value}) => {
    const style = {
        padding: 0,
        listStyleType: 'none',
        marginTop: 0
    }

    return (
        <div>
            <ul style={style}>
                {value.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
    );
}

const CountryInfo = ({value}) => {
    const country = value[0];
    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital[0]} <br />
            area {country.area}

            <h3>languages: </h3>
            <ul>
                {Object.values(country.languages).map((lang, i) => {
                    return (<li key={i} >{lang}</li>);
                })}
            </ul>
            <br />
            <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
        </div>
    );
    
}

export default CountryDisplay;