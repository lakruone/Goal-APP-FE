import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';
import RouteWrapper from "./RouteWrapper";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouteWrapper/>
      </div>
    </BrowserRouter>
  );
} 

export default App;
