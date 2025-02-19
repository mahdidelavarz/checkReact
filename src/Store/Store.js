import { makeAutoObservable } from "mobx";

class Store {
  tabBarIndex = 0;  // Back handle in tabbar and profile
  cameraZoom = 0;   // Camera zoom from record
  token = null;     // User token

  constructor() {
    makeAutoObservable(this);
  }

  incrementTabBar() {
    this.tabBarIndex = 1;
  }

  decrementTabBar() {
    this.tabBarIndex = 0;
  }

  setCameraZoom(zoom) {
    this.cameraZoom = zoom;
  }

  setToken(data) {
    this.token = data;
  }

  clearToken() {
    this.token = null;
  }
}

export default new Store();
