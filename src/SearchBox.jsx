import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import continentData from "./data/continents.js"


function SearchBox({state, setState, options, initialValue, label}) {

    /**const countries = countryData.map(d => {
        return d.Location
    }).filter((value, index, self) => self.indexOf(value) === index)**/

  return (
    <div>
        <Autocomplete
            className="combo-box"
            value={initialValue}
            inputValue={state}
            onInputChange={(event, newInputValue) => {
                d3.select(".line_viz").selectChildren("*").remove();
                setState(newInputValue);
            }}
            options={options}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    </div>
    
  );
}

export default SearchBox;

