import React, { useState, useEffect, FC } from "react";
import FetchData from "./component/FetchData";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <FetchData />
    </div>
  );
};

export default App;
