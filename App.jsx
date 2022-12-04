import { h } from "start-dom-jsx";
import Hello from "./views/Hello";
import AboutMe from "./views/AboutMe";
import Projects from "./views/Projects";
import WorkExperience from "./views/WorkExperience";
import Contact from "./views/Contact";

export default () => {
  return (
    <div class="app-wrapper">
      <section class="section">
        <Hello/>
      </section>

      <section class="section">
        <AboutMe/>
      </section>

      <section class="section">
        <Projects/>
      </section>

      <section class="section">
        <WorkExperience/>
      </section>

      <section class="section">
        <Contact/>
      </section>

    </div>
  );
};
