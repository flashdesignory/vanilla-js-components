/**
 * EventsObserver
 * The EventsObserver uses the MutationObserver to add (connect) or remove (disconnect) listeners of an element.
 * The MutationObserver triggers callbacks on adding or removing the element to the dom.
 * Once this happens, all events in the array get added or removed.
 */
export class EventsObserver {
  constructor({ ref, parent, events = [], onConnect, onDisconnect }) {
    this.ref = ref; // dom node
    this.parent = parent; // dom node
    this.events = events; // { type: string, listener: function }[]
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;

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
    this.events.forEach((entry) =>
      this.ref.addEventListener(...Object.values(entry))
    );

    if (this.onConnect) this.onConnect(this.ref.id);
  }

  disconnect() {
    this.events.forEach((entry) =>
      this.ref.removeEventListener(...Object.values(entry))
    );

    if (this.onDisconnect) this.onDisconnect(this.ref.id);
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
