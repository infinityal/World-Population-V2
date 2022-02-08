import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function MultiCharts({ Country, param }) {
  //Read the data

  // append the svg object to the body of the page

  // get the data
  d3.json("src/data/PopData.json").then(function (data) {
    data = data.filter((d) => {
      return d.Variant === "Medium" && d.Location === Country;
    });

    console.log(data["PopFemale"]);


    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 1200 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(".line_viz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.Time))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font", "8px times");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d[param];
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.Time))
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", (d) => height - y(0)) // always equal to 0
      .attr("y", (d) => y(0));

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(400)
      .attr("y", (d) => y(d[param]))
      .attr("height", (d) => height - y(d[param]))
      .delay((d, i) => {
        return i * 10;
      });
  });
  return (
    <div>
      <div className="line-charts">
        <svg className="line_viz"></svg>
      </div>
    </div>
  );
}

export default MultiCharts;
