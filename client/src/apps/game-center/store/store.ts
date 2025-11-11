export type LLStoreUnsubscriber = () => void;
export type LLStoreListener<TValue> = (value: TValue) => void;

export type LLStore<TValue> = {
  value: TValue;
  get: () => TValue;
  set: (value: TValue) => void;
  notify: () => void;
  listeners: LLStoreListener<TValue>[];
  subscribe: (cb: LLStoreListener<TValue>) => LLStoreUnsubscriber;
};

export function createStore<StoreValue = any>(initialValue: StoreValue) {
  const store = {
    value: initialValue,
    listeners: [] as LLStoreListener<StoreValue>[],
    set: (updateValue: StoreValue) => {
      store.value = updateValue;
      store.notify();
    },
    get: () => {
      return store.value;
    },
    notify: () => {
      if (store.listeners.length) {
        const newValue = store.get();
        try {
          store.listeners.forEach((cb) => cb(newValue));
        } catch (error) {
          console.error('Error while calling banner subscribers', error);
        }
      }
    },
    subscribe: (cb: LLStoreListener<StoreValue>) => {
      const cbIndex = store.listeners.findIndex((_cb) => _cb === cb);
      if (cbIndex < 0) {
        store.listeners = [...store.listeners, cb];
      } else {
        store.listeners = [...store.listeners];
        store.listeners.splice(cbIndex, 1, cb);
      }
      return () => {
        store.listeners = store.listeners.filter((_cb) => _cb !== cb);
      };
    },
  };
  return store;
}
