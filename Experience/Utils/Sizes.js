import { EventEmitter } from "events";

export default function Sizes() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.aspect = this.width / this.height;
  this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  this.frustrum = 12;
  this.event = new EventEmitter()

  if (this.width < 968) {
    this.device = "mobile";
  } else {
    this.device = "desktop";
  }

  window.addEventListener("resize", () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.event.emit("resize");

    if (this.width < 968 && this.device !== "mobile") {
      this.device = "mobile";
      this.event.emit("switchdevice", this.device);
    } else if (this.width >= 968 && this.device !== "desktop") {
      this.device = "desktop";
      this.event.emit("switchdevice", this.device);
    }
  });
}
