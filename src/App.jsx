'use strict';

import './App.css'
import Divider from '@mui/material/Divider';
import Chart from './Chart';
import SearchBox from './SearchBox';
import { useState } from 'react';
import MultiCharts from './MultiCharts';
import countryData from "./data/countries"


  
function App() {
  const [country, setCountry] = useState('');
  const [param, setParam] = useState('');

  console.log(country);
  const countryOptions = countryData;
  const allgroups = ["PopMale", "PopFemale", "PopTotal"];

  return (
    <div className="App">
      <div className='Header'>
        <h1>World Population Visualization 1950 - 2100</h1>
      </div>
      <div>
        <SearchBox state={country} setState={setCountry} initialValue={"Afghanistan"} options={countryOptions} label={"Country"}/>
      </div>
      <Chart Country={country}/>
      <Divider/>
      <div>
        <SearchBox state={param} setState={setParam} initialValue={"PopTotal"} options={allgroups} label={"Parameter"}/>
        <MultiCharts Country={country} param={param}/>
      </div>
      <section id='writeup_section'>
        <h2>Write-Up Section</h2>
        
      </section>
    </div>
  )
} 

export default App
