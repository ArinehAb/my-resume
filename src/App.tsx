import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import SkillsPage from "./components/tabs/TabPages/SkillsPage";
import EducationPage from "./components/tabs/TabPages/EducationPage";
import ProjectsPage from "./components/tabs/TabPages/ProjectsPage";

function App() {
  return (
    <Router>
      {/* If you want ResumeHoverPanels on every page, you can also move it here
          ABOVE <Routes> instead of inside HomePage.
          Example:
          <ResumeHoverPanels />
      */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
