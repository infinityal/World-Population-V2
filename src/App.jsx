'use strict';

import './App.css'
import Divider from '@mui/material/Divider';
import Chart from './Chart';
import SearchBox from './SearchBox';
import { useState } from 'react';
import MultiCharts from './MultiCharts';

  
function App() {
  const [country, setCountry] = useState('');
  console.log(country);

  return (
    <div className="App">
      <div className='Header'>
        <h1>World Population Visualization 1950 - 2100</h1>
      </div>
      <div>
        <SearchBox country={country} setCountry={setCountry}/>
      </div>
      <Chart Country={country}/>
      <Divider/>
      <MultiCharts Country={country} param={"PopFemale"}/>
      <section id='writeup_section'>
        <h2>Write-Up Section</h2>
        
      </section>
    </div>
  )
} 

export default App
