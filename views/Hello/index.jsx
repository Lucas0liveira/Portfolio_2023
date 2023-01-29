import { h } from "start-dom-jsx";
import "./styles.scss"

export const Hello = () => {

  return (
    <div class="hello">
      <div class="container">
        <h1>Hi!</h1>
        <h2>My name is Lucas Freitas</h2>
        <p>I'm a Front-end Software Engineer and...</p>

        <h3 style="margin-top:3rem">...This portfolio is a work in progress 🚧🛑🚧</h3>
        <p>The current roadmap for it looks a bit like this:</p>
        <br />
        <ul>
          <li>✅3D Modeling and Animations in Blender</li>
          <li>✅Building the 3D scene in the web using THREEJS</li>
          <li>✅Light, colors, camera movement</li>
          <li>🕜The actual content</li>
          <li>🕜Adapting to mobile devices</li>
          <li>🕜Theme toggling</li>
          <li>🕜Translations</li>
          <li>🕜Deploying and hosting on an owned domain</li>
        </ul>
      </div>
    </div>
  )
}

export default Hello