export class EventBroadcaster {
  constructor() {
    this.events = [];
  }

  subscribe(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
  }

  unsubscribe(event, fn) {
    this.events[event] = this.events[event].filter((cb) => cb !== fn);
  }

  broadcast(event, data) {
    if (this.events[event] === undefined) return;
    this.events[event].forEach((cb) => cb(data));
  }
}
