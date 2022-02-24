import React from "react";
import "/src/index.css";

function Donut({Time}) {
  const width = 200,
      height = 200,
      margin = 20;


  d3.json(
    "https://raw.githubusercontent.com/infinityal/World-Population-V2/main/src/data/PopData.json"
  ).then(function (data) {
    data = data
      .filter((d) => {
        return d.Variant === "Medium" && d.Time === Time && d.PopFemale !== "NA";
      })
      .map((d) => {return {PopMale: d.PopMale, PopFemale: d.PopFemale}});

    const radius = Math.min(width, height) / 2 - margin;
    
    let prep_data = [0,0];
    for(let i = 0; i < data.length; i++) {
      prep_data[0] += parseInt(data[i].PopFemale);
      prep_data[1] += parseInt(data[i].PopMale);
    }
    data = prep_data;

    const svg = d3
      .select("#donut_2100")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal().range(["#FC814A", "#2E4057"]);

    const pie = d3.pie().value((d) => d[1]);

    const data_ready = pie(Object.entries(data));

    console.log(data_ready)

    svg
      .selectAll("abc")
      .data(data_ready)
      .join("path")
      .attr("d", d3.arc().innerRadius(50).outerRadius(radius))
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);
  });

  return (
    <div className="donut_viz">
      <svg id="donut_2100"></svg>
    </div>
  );
}

export default Donut;
