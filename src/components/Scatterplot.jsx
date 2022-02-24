import React from "react";
import "/src/index.css";
import { useState, useEffect } from "react";

function Scatterplot({ Country, param }) {
  const margin = { top: 80, right: 30, bottom: 150, left: 80 },
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/infinityal/World-Population-V2/main/src/data/PopData.json"
    ).then(function (data) {
      data = data.filter((d) => {
        return d.Variant === "Medium" && d.Time === "2100";
      });

      d3.select("#scatterplot_viz").selectChildren("*").remove();

      const svg = d3
        .select("#scatterplot_viz")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.PopTotal;
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
            return +d.PopDensity;
          }),
        ])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
          return x(d["PopTotal"]);
        })
        .attr("cy", function (d) {
          return y(d["PopDensity"]);
        })
        .attr("r", 1.5)
        .style("fill", "#69b3a2");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 10)
        .text("Total Population(thousands)");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Population Density(thousands)");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("World's Population vs Density in 2100");
    });
  });

  return (
    <div>
      <svg id="scatterplot_viz"></svg>
    </div>
  );
}

export default Scatterplot;
