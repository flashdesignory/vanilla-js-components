export class EventsObserver {
  constructor({ ref, parent, events = [] }) {
    this.ref = ref; // dom node
    this.parent = parent; // dom node
    this.events = events; // { type: string, listener: function }[]

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleOnMutation = this.handleOnMutation.bind(this);

    const config = { childList: true, subtree: true };
    const observer = new MutationObserver(this.handleOnMutation);
    observer.observe(this.parent, config);

    if (this.ref.parentNode === this.parent) {
      this.connect();
    }
  }

  connect() {
    console.log("connect()");
    this.events.forEach((entry) =>
      this.ref.addEventListener(...Object.values(entry))
    );
  }

  disconnect() {
    console.log("deconnect()");
    this.events.forEach((entry) =>
      this.ref.removeEventListener(...Object.values(entry))
    );
  }

  add(event) {
    this.events.push(event);
  }

  remove(event) {
    this.events.filter((entry) => entry !== event);
  }

  handleOnMutation(mutationList) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        const refWasAdded = Array.from(mutation.addedNodes).find(
          (node) => node === this.ref
        );
        const refWasRemoved = Array.from(mutation.removedNodes).find(
          (node) => node === this.ref
        );
        if (refWasAdded) this.connect();
        if (refWasRemoved) this.disconnect();
      }
    }
  }
}
