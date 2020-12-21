import React, { useEffect } from "react";
import * as d3 from "d3";

import IndiaMap from "./IndiaMap";
import TimeViz from "./TimeViz";

function App() {
  return (
    <div>
      <IndiaMap />
      <TimeViz />
    </div>
  );
}

export default App;
