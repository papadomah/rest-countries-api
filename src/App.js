import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import Header from './Header';
import Country from './Country';
import CountryDetails from './CountryDetails';



function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();
  const noCountries = countries.status || countries.message;

  const switchMode = () => {
    setDarkMode(prevState => !prevState);
  };

  useEffect(() => { //to see all countries on the home page
    fetchData();
  }, []);

  const fetchData = async () => { 
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      if (data.status === 404) {
        setCountries([]);
        return;
      }
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchCountries = async () => { //to implement the search countries by search impute
    const searchValue = countriesInputRef.current.value;
    if (searchValue.trim()) {
      try {
        const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchData();
    }
  };

  //filter by region
  const selectRegion = () =>{
    const selectValue = regionRef.current.value;
    if(selectValue.trim()){
      const fetchSelect = async () => {
        const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`);
        const data = await response.json();
        if (selectValue === 'All'){
          try{
            fetchData()
          } catch(error) {
            console.log(error)
          }
          return;
        }

        setCountries(data);
      };
      try{
        fetchSelect();
      } catch(error){
        console.log(error);
      }

    }
  };

  const showDetails = (code) =>{
    navigate(`/${code}`);

  }

  return (
    <div className={`app ${darkMode ? 'darkMode' : ''}`}>
      <Header onClick={switchMode} darkMode={darkMode} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app_body">
              <div className="inputs">
                <div className={`search_input ${darkMode ? 'darkMode' : ''}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search for a country...."
                    ref={countriesInputRef}
                    onChange={searchCountries}
                  />
                </div>
                <div className={`select_region ${darkMode ? 'darkMode' : ''}`}>
                  <select ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">
                { !noCountries ? (countries.map(country => (
                  <Country
                    darkMode={darkMode}
                    key={country.alpha3Code}
                    code={country.alpha3Code}
                    name={country.name.common}
                    capital={country.capital}
                    population={country.population}
                    region={country.region}
                    flag={country.flags.svg}
                    showDetails = {showDetails}
                  />
                ))) : (
                  <p>No Countries found ....</p>
                )  }
              </div>
            </div>
          }
        />
        <Route path="/:countryCode" element={<div><CountryDetails darkMode={darkMode} countries={countries} refetch={fetchData}/></div>} />
      </Routes>
    </div>
  );
}

export default App;
