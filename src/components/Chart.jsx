import React from "react";
import ReactDOM from "react-dom";
import "/src/index.css";
import { useState, useEffect } from "react";

function Chart({ Country }) {
  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/infinityal/World-Population-V2/main/src/data/PopData.json"
    ).then(function (data) {
      data = data.filter((d) => {
        return d.Variant === "Medium" && d.Location === Country;
      });

      const allGroup = ["PopMale", "PopFemale", "PopTotal"];
      const yAxis = ["Population", "Population per square kilometre"];
      let yLab = yAxis[0];

      const margin = { top: 50, right: 100, bottom: 30, left: 80 },
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      d3.select("#country_viz").selectChildren("*").remove();

      const svg = d3
        .select("#country_viz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const dataReady = allGroup.map(function (grpName) {
        return {
          name: grpName,
          values: data.map(function (d) {
            return { time: d.Time, value: +d[grpName] };
          }),
        };
      });

      const myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

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

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Years");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Population(thousands)");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(Country + "'s " + yLab + " vs Years");
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
