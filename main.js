import './base.scss'
import App from './App.jsx'
import Experience from "./Experience/Experience"

document.querySelector('.app').appendChild(App()) 
const experience = new Experience(document.querySelector(".canvas"))
