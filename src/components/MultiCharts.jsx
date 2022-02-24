import React from "react";
import "/src/index.css";
import { useState, useEffect } from "react";

function MultiCharts({ Country, param }) {
  useEffect(() => {
    d3.json(
      "https://raw.githubusercontent.com/infinityal/World-Population-V2/main/src/data/PopData.json"
    ).then(function (data) {
      data = data.filter((d) => {
        return d.Variant === "Medium" && d.Location === Country;
      });

      console.log(data["PopFemale"]);

      const gender = ["Male", "Female"];
      const yAxis = ["Population", "Population per square kilometre"];
      let yLab = yAxis[0];
      let titleLab = gender[0];
      if (param === "PopDensity") {
        yLab = yAxis[1];
        titleLab = "";
      } else if (param === "PopFemale") {
        titleLab = gender[1];
      } else if (param === "PopTotal") {
        titleLab = "Total";
      }

      const margin = { top: 30, right: 30, bottom: 80, left: 70 },
        width = 1500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      d3.select(".line_viz").selectChildren("*").remove();

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

      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Time))
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        .attr("height", (d) => height - y(0))
        .attr("y", (d) => y(0));

      svg
        .selectAll("rect")
        .transition()
        .duration(400)
        .attr("y", (d) => y(d[param]))
        .attr("height", (d) => height - y(d[param]))
        .delay((d, i) => {
          return i * 10;
        });

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 35)
        .text("Years");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text(yLab + "(thousands)");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(Country + "'s " + titleLab + " " + yLab + " vs Years");
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
