Promise.all([
  d3.csv("./Data/drop_out_rate.csv"),
  d3.csv("./Data/school_boys_toilet.csv"),
  d3.csv("./Data/school_computer.csv"),
  d3.csv("./Data/school_drinking_water.csv"),
  d3.csv("./Data/school_electricity.csv"),
  d3.csv("./Data/school_girls_toilet.csv"),
  d3.csv("./Data/gross_enrollment_school.csv")
]).then(showData);

function showData(data) {
  const bodyHeight = 500;
  const bodyWidth = 1000;
  let container = d3.select("#divergingBarChart");
  let states = {};
  for (let { State_UT, year, Avg } of data) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }
  let stateData = [];
  for (let state in states) {
    stateObj = states[state];
    let year1 = stateObj["2012-13"] ? stateObj["2012-13"] : stateObj["2013-14"];
    let year2 = stateObj["2014-15"];

    let absoluteChange = year2 - year1;
    let percentChange = ((year2 - year1) / year1) * 100;

    absoluteChange = +absoluteChange.toFixed(2);
    percentChange = +percentChange.toFixed(2);
    stateData.push({ state, absoluteChange, percentChange });
  }
  //diverging bar chart code
  let margin = { top: 30, right: 60, bottom: 10, left: 60 };
  let barHeight = 25;
  let height =
    Math.ceil((stateData.length + 0.1) * barHeight) +
    margin.top +
    margin.bottom;

  //let format = d3.format("+,.0%");
  xAxis = (g) =>
    g
      .attr("transform", `translate(0,${margin.top})`)
      .call(
        d3
          .axisTop(x)
          .ticks(bodyWidth / 80)
          .tickFormat((d) => d + "%")
      )
      .call((g) => g.select(".domain").remove());

  yAxis = (g) =>
    g
      .attr("transform", `translate(${x(0)},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat((i) => stateData[i].state)
          .tickSize(0)
          .tickPadding(6)
      )
      .call((g) =>
        g
          .selectAll(".tick text")
          .filter((i) => stateData[i].percentChange < 0)
          .attr("text-anchor", "start")
          .attr("x", 6)
      );

  x = d3
    .scaleLinear()
    .domain(d3.extent(stateData, (d) => d.percentChange))
    .rangeRound([margin.left, bodyWidth - margin.right]);
  y = d3
    .scaleBand()
    .domain(d3.range(stateData.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  container
    .append("g")
    .selectAll("rect")
    .data(stateData)
    .join("rect")
    .attr("fill", (d) => d3.schemeSet1[d.percentChange > 0 ? 1 : 0])
    .attr("x", (d) => x(Math.min(d.percentChange, 0)))
    .attr("y", (d, i) => y(i))
    .attr("width", (d) => Math.abs(x(d.percentChange) - x(0)))
    .attr("height", y.bandwidth());

  container
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(stateData)
    .join("text")
    .attr("text-anchor", (d) => (d.percentChange < 0 ? "end" : "start"))
    .attr("x", (d) => x(d.percentChange) + Math.sign(d.percentChange - 0) * 4)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text((d) => d.percentChange + "%");

  container.append("g").call(xAxis);

  container.append("g").call(yAxis);
}
