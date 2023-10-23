import { EventEmitter } from "events";

export default function Time() {
  this.start = Date.now();
  this.current = this.start;
  this.elapsed = 0;
  this.delta = 16; //for 60fps
  this.event = new EventEmitter()

  this.update = function () {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.event.emit("update")
    requestAnimationFrame(() => {
      this.update()
    });
  };

  this.update();
}
