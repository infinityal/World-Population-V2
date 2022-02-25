import "/src/index.css";
import Divider from "@mui/material/Divider";
import Chart from "./Chart";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";
import MultiCharts from "./MultiCharts";
import countryData from "/src/data/countries";
import Donut_1950 from "./Donut_1950";
import Donut_2100 from "./Donut_2100";
import BarChart from "./BarChart";
import Slider from "./YearSlider"
import { Route, Switch } from "react-router-dom";

function App() {
  const [country, setCountry] = useState("Afghanistan");
  const [param, setParam] = useState("PopTotal");
  const [year, setYear] = useState(2020)

  console.log(country);
  const countryOptions = countryData;
  const allgroups = ["PopMale", "PopFemale", "PopTotal", "PopDensity"];

  return (
    <Switch>
      <Route exact path="/">
        <div className="App">
          <div className="Header">
            <h1>World Population Visualization 1950 - 2100</h1>
          </div>
          <div>
            <SearchBox
              initialValue={"Afghanistan"}
              state={country}
              setState={setCountry}
              options={countryOptions}
              label={"Country"}
            />
          </div>
          <Chart Country={country} />
          <Divider />
          <div>
            <SearchBox
              initialValue={"PopTotal"}
              state={param}
              setState={setParam}
              options={allgroups}
              label={"Parameter"}
            />
            <MultiCharts Country={country} param={param} />
          </div>
          <Divider />
          {/*<div>
            <BarChart Year={year} Country={country} />
            <div className="slider">
              <Slider year={year} setYear={setYear}/>
            </div>
          </div>*/}
          <Divider />
          {/*<div className="donut">
            <Donut_1950 Time={"1950"}/>
            <Donut_2100 Time={"2100"}/>
          </div>*/}
          <section id="writeup_section">
            <h2>Write-Up Section</h2>
            <p>
              It's surprising to see that countries nowadays with most population are having
              descending trend, such as China, United States, and within a few years, India.
              And those less developed countries such as Nigeria, on the other hand, is started 
              to experience a stable population increase, and predictably surpass most developed 
              countries.
            </p>
          </section>
          <Divider />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
