
import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

function CountryDetails({ darkMode, countries, refetch }) {
  const params = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const country = countries.find((country) => country.alpha3Code === params.countryCode);
    if (country) {
      setCountryData(country);
    }
  }, [countries, params.countryCode]);

  const goBack = () => {
    navigate('/');
  };

  if (!countryData) {
    return null; // or you can show a loading spinner or message
  }

  const {
    name,
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders = [],
  } = countryData;

  return (
    <div className="country_details">
      <button className={`back ${darkMode ? 'darkMode' : ''}`} onClick={goBack}>
        <ArrowBackIcon />
        <p>Go Back</p>
      </button>
      <div className="country_details_body">
        <div className="img_container">
          <img className='flag' src={flag} alt="" />
        </div>
        <div className="info">
          <h2 >{name}</h2>
          <div className="info_container">
            <div className="left_info">
              <p>
                Native Name:{' '}
                <span className={`values ${darkMode ? 'darkMode' : ''}`}>{nativeName}</span>
              </p>
              <p>
                Population:{' '}
                <span className={`values ${darkMode ? 'darkMode' : ''}`}>{population}</span>
              </p>
              <p>
                Region:{' '}
                <span className={`values ${darkMode ? 'darkMode' : ''}`}>{region}</span>
              </p>
              <p>
                Sub region:{' '}
                <span className={`values ${darkMode ? 'darkMode' : ''}`}>{subregion}</span>
              </p>


               <p>
                Capital:<span className={`values ${darkMode ? 'darkMode' : ''}`}>{capital}</span>
              </p>
            </div>
            <div className="right_info">
             
              <p>
                Top-level Domain:
                <span className={`values ${darkMode ? 'darkMode' : ''}`}>{topLevelDomain}</span>
              </p>
              <p>
                Currencies:{' '}
                {currencies.map((currency, index) => (
                  <span key={index} className={`values ${darkMode ? 'darkMode' : ''}`}>
                    {currency.name}
                    {index !== currencies.length - 1 && ','}
                  </span>
                ))}
              </p>
              <p>
                Language:{' '}
                {languages.map((language, index) => (
                  <span key={index} className={`values ${darkMode ? 'darkMode' : ''}`}>
                    {language.name}
                    {index !== languages.length - 1 && ','}
                  </span>
                ))}
              </p>
            </div>
          </div>
          

          Border Countries:         
         {borders.length ?(
          borders.map(border =>(
            <div 
            key={border} 
            className={`border_country ${darkMode ? 'darkMode' : ''}`}
            onClick={() =>{ //implement the click on the border countries
              refetch();
              navigate(`/${border}`)
            }}            
            >
            {border}
            </div>
          ))
        ) : (
          <div className={`values ${darkMode ? 'darkMode' : ''}`}>
              <p>No borders...</p>
            </div>
        )}
      </div>
    </div>
  </div>
    
  );
}

export default CountryDetails;
