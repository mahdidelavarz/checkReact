import { observable, action } from 'mobx';

class Store {
    @observable tabBarIndex = 0; // back handle in tabbar and profile

    @action
    incrementTabBar() {
        this.tabBarIndex = 1;
    };

    @action
    decrementTabBar() {
        this.tabBarIndex = 0;
    };


    @observable cameraZoom = 0; // camera zoom from record

    @action
    setCameraZoom(zoom) {
        this.cameraZoom = zoom;
    };


    @observable token = null; // token user

    @action
    setToken(data) {
        this.token = data;
    };

    @action
    clearToken() {
        this.token = null;
    };
};
export default new Store();