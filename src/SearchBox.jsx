import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countryData from "/src/data/countries.js"
import continentData from "/src/data/continents.js"


function SearchBox({country, setCountry}) {

    /**const countries = countryData.map(d => {
        return d.Location
    }).filter((value, index, self) => self.indexOf(value) === index)**/

  return (
    <div>
        <Autocomplete
            className="combo-box"
            inputValue={country}
            onInputChange={(event, newInputValue) => {
                setCountry(newInputValue);
            }}
            options={countryData}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Country" />}
        />
    </div>
    
  );
}

export default SearchBox;

