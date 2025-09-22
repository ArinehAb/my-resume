import React from "react";
import SelfIntroduction from "../components/selfIntroduction/SelfIntroduction";
import ResumeHoverPanels from "../components/tabs/ResumeHoverPanels";
import SidebarTimeline from "../components/resumeTimeline/SidebarTimeline";

const timelineData = [
  {
    id: "current",
    title: "Software Engineer",
    org: "NBC Sports",
    range: "02/2022 – Present",
    current: true,
    summary:
      "Contributing to NBC Sports as a Software Engineer, leading test automation and CI/CD initiatives while ensuring system performance and mentoring new hires.",
    bullets: [
      "Create and manage test automation processes that align with project standards, including web and mobile automation.",
      "Lead efforts in CI/CD pipeline design and implementation using GitHub Actions, enabling daily automated builds, uploads, and testing.",
      "Perform load testing in collaboration with DevOps to ensure optimal website performance.",
      "Design and develop software, focusing on meeting project goals and ensuring high-quality code that aligns with best practices.",
      "Write complex SQL queries.",
      "Review code developed by other developers and provide feedback to ensure best practices.",
      "Mentor new hires to develop the right skills to excel at their jobs.",
      "Lead Daily Stand-ups as needed.",
    ],
  },
  {
    id: "gap",
    title: "Career Pause / Self-Study",
    org: "Professional Development",
    range: "09/2021 – 01/2022",
    summary:
      "Took time off for family responsibilities while continuing professional development to stay current with industry trends.",
    bullets: [
      "Completed Udemy courses in React, TypeScript, CI/CD, and Test Automation.",
      "Worked on small personal projects to apply new skills.",
      "Maintained coding proficiency and stayed aligned with modern practices.",
    ],
  },
  {
    id: "prev",
    title: "Data Analyst / Software Engineer",
    org: "TraPac",
    range: "09/2019 – 08/2021",
    summary:
      "Worked across analytics and engineering, designing software, building data pipelines, and ensuring robust reporting solutions.",
    bullets: [
      "Design, develop, and unit test applications to support business requirements.",
      "Write complex SQL queries to extract and transform data efficiently.",
      "Collaborate with team members and work independently to deliver projects on time.",
      "Develop reports using Microsoft SQL Server, Tableau, SSRS, and Excel tools.",
      "Develop and maintain CI/CD pipeline implementations.",
      "Create ETL processes to move data between internal and external sources.",
      "Modify legacy software to fix bugs and improve performance for desktop and web-based applications.",
      "Utilize Azure DevOps to set up and monitor build and release pipelines, integrating continuous testing and automated deployment.",
    ],
  },
  {
    id: "uni",
    title: "B.S. in Computer Science",
    org: "Your University",
    range: "2016 – 2020",
    summary:
      "Specialized in frontend development and software testing during academic studies.",
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <SelfIntroduction />
      <ResumeHoverPanels />
      <SidebarTimeline items={timelineData} />
    </div>
  );
};

export default HomePage;
