export class EventBroadcaster {
  constructor() {
    this.events = [];
  }

  subscribe(event, fn, namespace) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    if (namespace !== undefined) {
      this.events[event].push({ fn, namespace });
      return;
    }

    this.events[event].push({ fn });
  }

  unsubscribe(event, fn, namespace) {
    if (namespace !== undefined) {
      this.events[event] = this.events[event].filter((entry) => entry.fn !== fn && entry.namespace !== namespace);
      return;
    }
    this.events[event] = this.events[event].filter((entry) => entry.fn !== fn);
  }

  broadcast(event, data, namespace) {
    if (this.events[event] === undefined) return;

    if (namespace !== undefined) {
      this.events[event].forEach((entry) => entry.namespace === namespace && entry.fn(data));
      return;
    }

    this.events[event].forEach((entry) => entry.fn(data));
  }
}
