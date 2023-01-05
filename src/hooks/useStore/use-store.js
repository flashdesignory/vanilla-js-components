import { Store } from "./store.js";

export const useStore = ({ namespace, initialState = {} }) => {
  const store = Store.getInstance({ initialState, namespace });

  const getState = (key) => {
    console.log("getState", namespace, key);
    return store.getState(key, namespace);
  };

  const setState = (key, value) => {
    console.log("setState", namespace, key, value);
    return store.setState(key, value, namespace);
  };

  const resetStore = () => {
    console.log("resetState");
    store.resetStore();
  };

  const getStore = (namespace) => ({ ...store.getStore(namespace) });

  const subscribe = (callback) => {
    store.events.subscribe("state-change", callback, namespace);
  };

  return {
    getState,
    setState,
    resetStore,
    getStore,
    subscribe,
  };
};
