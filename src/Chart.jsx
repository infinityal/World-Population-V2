import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Chart({ Country }) {
  //Read the data
  d3.json("src/data/PopData.json").then(function (data) {
    data = data.filter((d) => {
      return d.Variant === "Medium" && d.Location === Country;
    });
    // List of groups (here I have one group per column)
    const allGroup = ["PopMale", "PopFemale", "PopTotal"];

    const margin = { top: 10, right: 100, bottom: 30, left: 80 },
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    d3.select("#country_viz").selectChildren("*").remove();

    // append the svg object to the body of the page
    const svg = d3
      .select("#country_viz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Reformat the data: we need an array of arrays of {x, y} tuples
    const dataReady = allGroup.map(function (grpName) {
      return {
        name: grpName,
        values: data.map(function (d) {
          return { time: d.Time, value: +d[grpName] };
        }),
      };
    });

    // A color scale: one color for each group
    const myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

    


    // Add X axis --> it is a date format
    const x = d3
      .scaleLinear()
      .domain([
        1950,
        d3.max(data, function (d) {
          return +d.Time;
        }),
      ])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.PopTotal;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the lines
    const line = d3
      .line()
      .x((d) => x(+d.time))
      .y((d) => y(+d.value));
    svg
      .selectAll("myLines")
      .data(dataReady)
      .join("path")
      .attr("class", (d) => d.name)
      .attr("d", (d) => line(d.values))
      .attr("stroke", (d) => myColor(d.name))
      .style("stroke-width", 2)
      .style("fill", "none");

    // Add a legend (interactive)
    svg
      .selectAll("myLegend")
      .data(dataReady)
      .join("g")
      .append("text")
      .attr("x", (d, i) => 30 + i * 120)
      .attr("y", 30)
      .text((d) => d.name)
      .style("fill", (d) => myColor(d.name))
      .style("font-size", 15)
      .on("click", function (event, d) {
        const currentOpacity = d3.selectAll("." + d.name).style("opacity");
        d3.selectAll("." + d.name)
          .transition()
          .style("opacity", currentOpacity == 1 ? 0 : 1);
      });
  });




  return (
    <div>
      <div className="chart">
        <svg id="country_viz"></svg>
      </div>
    </div>
  );
}

export default Chart;
