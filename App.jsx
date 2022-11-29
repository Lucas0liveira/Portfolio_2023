import { h } from "start-dom-jsx";
import Hello from "./views/Hello";
import AboutMe from "./views/AboutMe";
import Projects from "./views/Projects";
import WorkExperience from "./views/WorkExperience";
import Contact from "./views/Contact";

export default () => {
  return (
    <div class="app-wrapper">
      <section class="section hello">
        <Hello/>
      </section>

      <section class="section about-me">
        <AboutMe/>
      </section>

      <section class="section projects">
        <Projects/>
      </section>

      <section class="section work-experience">
        <WorkExperience/>
      </section>

      <section class="section contact">
        <Contact/>
      </section>

    </div>
  );
};
