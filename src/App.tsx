// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hm from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hm />} />
      </Routes>
    </Router>
  );
}

export default App;
