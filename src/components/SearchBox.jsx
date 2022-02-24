import * as React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import continentData from "/src/data/continents.js";
import {useState} from "react";

function SearchBox({ state, setState, options, initialValue, label }) {
    const [value, setValue] = useState(state);
  /**const countries = countryData.map(d => {
        return d.Location
    }).filter((value, index, self) => self.indexOf(value) === index)**/

  return (
    <div>
      <Autocomplete
        className="combo-box"
        value={value}
        inputValue={state}
        onChange={(event, newValue) => {
            setValue(newValue);
          }}
        onInputChange={(event, newInputValue) => {
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
