Promise.all([
  d3.csv("./Data/drop_out_rate.csv"),
  d3.csv("./Data/school_boys_toilet.csv"),
  d3.csv("./Data/school_computer.csv"),
  d3.csv("./Data/school_drinking_water.csv"),
  d3.csv("./Data/school_electricity.csv"),
  d3.csv("./Data/school_girls_toilet.csv"),
  d3.csv("./Data/gross_enrollment_school.csv")
]).then(showData);

const bodyHeight = 300;
const bodyWidth = 300;

function createLineChart(curState, stateData, container, curCategory) {
  container.selectAll("*").remove();
  let states = {};
  let formatYear = d3.timeParse("%Y");

  for (let { State_UT, year, Avg } of stateData) {
    year = formatYear(year.split("-")[0]);

    if (State_UT in states) {
      states[State_UT].push({ year: year, value: +Avg });
    } else {
      states[State_UT] = [{ year: year, value: +Avg }];
    }
  }
  // for  each state: draw line graph
  let maxVal = d3.max(states[curState], (d) => d.value);
  let minVal = d3.min(states[curState], (d) => d.value);

  let yScale = d3.scaleLinear().domain([minVal, maxVal]).range([bodyHeight, 0]);

  let xScale = d3
    .scaleTime()
    .domain(d3.extent(states[curState], (d) => d.year))
    .range([0, bodyWidth]);

  container
    .append("g")
    .attr("transform", "translate(40, 0)")
    .attr("opacity", 0.7)
    .call(d3.axisLeft(yScale).tickSize(-bodyWidth));

  container
    .append("text")
    .attr("transform", "rotate(-90)")
    // .attr("transform", "translate(10,0)")
    .attr("y", 0 - 10)
    .attr("x", 0 - bodyHeight / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(curCategory); /// change dynamically

  container
    .append("g")
    .attr("transform", `translate(40, ${bodyHeight})`)
    .attr("opacity", 0.7)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(3)
        .tickSize(-bodyHeight)
        .tickFormat(d3.timeFormat("%Y"))
    );

  container
    .append("text")
    .attr("transform", `translate(${30 + bodyWidth / 2}, ${bodyHeight + 30})`)
    .style("text-anchor", "middle")
    .text("Year");

  let valueLine = d3
    .line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  container
    .append("path")
    .datum(states[curState])
    .attr("d", valueLine)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("transform", "translate(40, 0)");
}

// main function
function showData(dataSources) {
  let container = d3.select("#lineChart");

  const [
    dropOutRate,
    schoolBoysToilet,
    schoolComputer,
    schoolDrinkingWater,
    schoolElectricity,
    schoolGirlsToilet,
    grossEnrollment
  ] = dataSources;
  dataMap = {
    dropOutRate,
    schoolBoysToilet,
    schoolComputer,
    schoolDrinkingWater,
    schoolElectricity,
    schoolGirlsToilet,
    grossEnrollment
  };

  curState = document.querySelector("#state").value;

  curCategory = document.querySelector("#categoryForDiverging").value;

  createLineChart(curState, dataMap[curCategory], container, curCategory);

  document.querySelector("#state").addEventListener("change", (event) => {
    curState = event.target.value;
    createLineChart(curState, dataMap[curCategory], container, curCategory);
  });

  document
    .querySelector("#categoryForDiverging")
    .addEventListener("change", (event) => {
      curCategory = event.target.value;
      createLineChart(curState, dataMap[curCategory], container, curCategory);
    });
}
