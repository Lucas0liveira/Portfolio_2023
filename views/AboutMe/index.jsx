import { h } from "start-dom-jsx";
import "./styles.scss";

export const AboutMe = () => {
  return (
    <div class="about-me">
      <div class="container">
        <h1>About me</h1>
        <br />
        <p>
          I obtained my Bachelor's degree in Software Engineering from UFMS and
          gained hands-on experience in Front-end Web Development through an
          internship at Before TI.
        </p>
        <br />
        <p>
          Starting as an intern, I quickly progressed to a full-time Front-end
          Developer role, where I am currently employed. I am responsible for
          not only developing and maintaining code, but also leading and
          mentoring the front-end team to deliver high-quality products.
        </p>
        <br />
        <p>
          I am passionate about creating visually stunning and user-friendly
          websites and web applications. I have a strong background in VueJS,
          and am always looking to expand my skills and learn new technologies.
        </p>
        {/* <ul>
          <br />
          <li>Bachelor's degree in Software Engineering from UFMS</li>
          <li>
            Hands-on experience in Front-end Web Development through internship
            at Before TI
          </li>
          <li>
            Progressed from intern to full-time Front-end Developer at Before TI
          </li>
          <li>Currently employed as a Front-end Developer, responsible for:</li>
          <li>Developing and maintaining code</li>
          <li>
            Leading and mentoring front-end team to deliver high-quality
            products
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default AboutMe;

// me formei na ufms
// tive algumas experiencias que me introduziram ao front end
// comecei na before como estagiário e hoje estou liderando a equipe
