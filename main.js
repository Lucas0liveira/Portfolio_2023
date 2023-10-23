import './base.scss'
import App from './App.jsx'
import Experience from "./Experience/Experience"

// document.querySelector('.app').appendChild(App()) //TODO restaurar
const experience = new Experience(document.querySelector(".canvas"))

console.log(experience.resources)
