import React, { useState } from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./App.css";
import Navigation from "./components/navigation";

function App() {

  const [view, setView] = useState("table");

  return (
    <div className="App">
      <Navigation selected={view} onSelect={setView} />
    </div>
  );
}

export default App;
