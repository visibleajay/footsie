import React from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Logo width={512} height={512} style={{backgroundColor: "white"}} />
    </div>
  );
}

export default App;
