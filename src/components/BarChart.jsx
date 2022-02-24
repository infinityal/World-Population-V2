import React from "react";
import "/src/index.css";
import { useState, useEffect } from "react";
import variants from "/src/data/variants.js";

function BarChart({ Year, Country }) {
  const subgroups = ["PopFemale, PopMale"];

  d3.json(
    "https://raw.githubusercontent.com/infinityal/World-Population-V2/main/src/data/PopData.json"
  ).then(function (data) {
    data = data.filter((d) => {
      return d.Time === Year.toString() && d.PopFemale !== "NA" && d.Location === Country;
    });

    console.log(data)

    d3.select("#bar").selectChildren("*").remove();

    const groups = variants;
    const stackedData = d3.stack().keys(subgroups)(data);
    const color = d3.scaleOrdinal().domain(subgroups).range(d3.schemeSet2);

    const margin = { top: 10, right: 30, bottom: 20, left: 70 },
      width = 1200 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#bar")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +Math.max(d.PopMale, d.PopFemale);
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.Variant))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("stroke", "grey");
  });

  return (
    <div className="bar_viz">
      <svg id="bar"></svg>
    </div>
  );
}

export default BarChart;
