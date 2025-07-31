import AppLayout from "../components/layout/AppLayout";
import Hero from "../components/hero/Hero";
import DetailsPanel from "../components/details/DetailsPanel";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <AppLayout>
      <Hero />
      <DetailsPanel />
      {/* Full list (optional): <Timeline /> */}
      <About />
      <Skills />
      <Projects />
      <Contact />
    </AppLayout>
  );
}
