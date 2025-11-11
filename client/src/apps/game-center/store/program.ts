import { createStore } from "./store";

export type programStoreValue = {
  programId?: string;
};
const initialProgramStore: programStoreValue = {};

const programStore = createStore(initialProgramStore);

export const programStoreAction = {
  updateProgramIdAction(programId: string) {
    programStore.set({ ...programStore.get(), programId: programId });
  },
};

export const programController = {
  getState(key: keyof programStoreValue): any {
    const state = programStore.get();
    return state[key];
  },
};
