import { createStore } from "./store";
import { IUserProfile } from "@livelike/javascript";
import LiveLike from "@livelike/engagementsdk";

export enum ActiveApp {
  DASHBOARD = "Dashboard",
  GameCenter = "game-center",
  LogOutScreen = "log-out-screen",
}

export type appStoreValue = {
  profile?: IUserProfile;
  activeApp?: ActiveApp;
};
const getActiveApp = localStorage.getItem('activeapp')
const initialappStore: appStoreValue = {
  // activeApp: getActiveApp ? getActiveApp : ActiveApp.DASHBOARD,
  activeApp: getActiveApp && Object.values(ActiveApp).includes(getActiveApp as ActiveApp)
    ? (getActiveApp as ActiveApp)
    : ActiveApp.DASHBOARD,
};

export const appStore = createStore(initialappStore);

export const appStoreAction = {
  updateUserProfileAction(profileData: IUserProfile) {
    appStore.set({ ...appStore.get(), profile: profileData });
  },
  updateActiveAppAction(activeApp: ActiveApp) {
    appStore.set({ ...appStore.get(), activeApp: activeApp });
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
  updateActiveApp(activeApp: ActiveApp) {
    localStorage.setItem('activeapp',activeApp)
    appStoreAction.updateActiveAppAction(activeApp);
  },
  async initializeLivelike(initArgs: {
    clientId: string;
    accessToken: string;
  }) {
    const res = await LiveLike.init(initArgs);
    if (res) {
      appStoreAction.updateUserProfileAction({
        ...res,
        access_token: initArgs.accessToken,
      });
    }
    return res;
  },
};
