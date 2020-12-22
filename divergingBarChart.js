d3.csv("./Data/drop_out_rate.csv").then(showData);
function showData(data) {
  let container = d3.select("#divergingBarChart");
  let states = {};
  for (let { State_UT, year, Avg } of data) {
    if (State_UT in states) {
      states[State_UT][year] = +Avg;
    } else {
      states[State_UT] = { [year]: +Avg };
    }
  }
  // Object.entries(states).map((d) => {
  //   d.absoluteChange = d["2014-2015"] - d["2012-2013"];
  //   d.percentChange = ((d["2014-2015"] - d["2012-2013"]) / d["2012-2013"]) * 99;
  //   return d;
  // });
  console.log(states);
}
