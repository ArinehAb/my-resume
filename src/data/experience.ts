export type TimelineCategory = "work" | "education";

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle?: string;
  period: string;
  category: TimelineCategory;
  summary: string;
  bullets?: string[];
}

export const experience: TimelineEntry[] = [
  {
    id: "current",
    title: "NBCUniversal",
    subtitle: "POST Software Engineer (Internal candidate)",
    period: "2024 — Present",
    category: "work",
    summary:
      "Working with GitHub/GitHub Actions; building automation and tooling; collaborating across teams.",
    bullets: [
      "Implemented CI workflows using GitHub Actions.",
      "Helped QA with WebdriverIO/Appium mobile testing setup.",
    ],
  },
  {
    id: "prev-1",
    title: "Previous Workplace",
    subtitle: "QA/Automation Engineer",
    period: "2019 — 2024",
    category: "work",
    summary:
      "Worked with Jenkins, Docker, TFS, SSIS, and SSRS; established pipelines and reporting.",
    bullets: [
      "Built Jenkins pipelines with Dockerized test suites.",
      "Owned reporting pipelines with SSIS/SSRS.",
    ],
  },
  {
    id: "prev-2",
    title: "Earlier Role",
    subtitle: "Software/QA Engineer",
    period: "2016 — 2019",
    category: "work",
    summary:
      "Full-stack and QA contributions across web apps and data workflows.",
  },
  {
    id: "edu-1",
    title: "College Attended",
    subtitle: "B.S. — (Your Major)",
    period: "—",
    category: "education",
    summary:
      "Add a short line about your focus, honors, or standout project/coursework.",
  },
];
