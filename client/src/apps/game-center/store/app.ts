import { createStore } from "./store";
import { IUserProfile } from "@livelike/javascript";
import LiveLike from "@livelike/engagementsdk";

export type appStoreValue = {
  profile?: IUserProfile;
};
const initialAppStore: appStoreValue = {};

const appStore = createStore(initialAppStore);

export const appStoreAction = {
  updateUserProfileAction(profileData: IUserProfile) {
    appStore.set({ ...appStore.get(), profile: profileData });
  },
};

export const appController = {
  getState(key: keyof appStoreValue): any {
    const state = appStore.get();
    return state[key];
  },
  updateUserProfile(profileData: IUserProfile) {
    appStoreAction.updateUserProfileAction(profileData);
  },
  async initializeLivelike(initArgs: {
    clientId: string;
    accessToken: string;
    lang: string;
  }) {
    try {
      const res = await LiveLike.init(initArgs);
      if (res) {
        appStoreAction.updateUserProfileAction(res);
      }
    } catch (error) {
      console.error("Error while initializing Livelike SDK", error);
      throw new Error("Error while initializing Livelike SDK");
    }
  },
};
