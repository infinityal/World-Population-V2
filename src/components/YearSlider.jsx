import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function YearSlider({year, setYear}) {
  return (
    <div className="slider">
      <Box sx={{ width: 1000 }}>
        <Slider
          value={year}
          onChange={(_, value) => setYear(value)}
          aria-label="Year"
          defaultValue={2020}
          valueLabelDisplay="auto"
          step={5}
          min={2020}
          max={2100}
        />
      </Box>
    </div>
  );
}

export default YearSlider;
