import { EventBroadcaster } from "./event-broadcaster.js";

export class Store {
  constructor(initialState = {}, namespace) {
    if (this.instance) {
      throw new Error("You can only create one instance!");
    }

    if (namespace !== undefined) {
      // if namespace used, create empty object and populate in
      // getInstance method
      this.initialState = {};
      this.state = {};
    } else {
      // if no namespace used, there can be only one initial state
      this.initialState = { ...initialState };
      this.state = { ...initialState };
    }

    this.events = new EventBroadcaster();
  }

  static getInstance({ initialState = {}, namespace } = {}) {
    if (!this.instance) {
      this.instance = new Store(initialState, namespace);
    }

    if (namespace !== undefined) {
      // populating initialState here, since multiple namespaces
      // can be used and all of them can have initial states.
      if (!this.instance.initialState[namespace]) {
        this.instance.initialState[namespace] = { ...initialState };
      }
      if (!this.instance.state[namespace]) {
        this.instance.state[namespace] = { ...initialState };
      }
    }

    return this.instance;
  }

  setState(key, value, namespace) {
    if (namespace !== undefined) {
      if (!this.state[namespace]) {
        throw new Error(
          "Namespace used that wasn't initialized with getInstance"
        );
      }

      this.state[namespace][key] = value;
      this.events.broadcast("state-change", this.state[namespace], namespace);
      return { key, value, namespace };
    }

    this.state[key] = value;
    this.events.broadcast("state-change", this.state);
    return { key, value };
  }

  getState(key, namespace) {
    if (namespace !== undefined) {
      const value = this.state[namespace][key];
      return { key, value, namespace };
    }

    const value = this.state[key];
    return { key, value };
  }

  resetStore() {
    this.state = { ...this.initialState };
  }

  getStore(namespace) {
    if (namespace !== undefined) return { ...this.state[namespace] };
    return { ...this.state };
  }
}
