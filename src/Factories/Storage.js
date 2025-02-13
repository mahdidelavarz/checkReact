import AsyncStorage from "@react-native-community/async-storage";

class Storage {

    // set data local storage
    set = async function (key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log("error", e);
        }
    };

    // get data local storage
    get = async function (key, then) {
        try {
            data = await AsyncStorage.getItem(key);
            then(data);
        } catch (e) {
            console.log("error", e);
        }
    };

    // remove data local storage
    remove = async function (key) {
        try {
            await AsyncStorage.removeItem(key);
            console.log('Done.')
        } catch (e) {
            console.log("error", e);
        }
    };

    // multi set data local storage
    multiSet = async function (keys) {
        try {
            await AsyncStorage.multiSet(keys);
        } catch {
            console.log("error", e);
        }
    }

    // multi get data local storage
    multiGet = async function (keys, then) {
        try {
            data = await AsyncStorage.multiGet(keys);
            then(data);
        } catch {
            console.log("error", e);
        }
    }

    // multi remove data local storage
    multiRemove = async function (keys) {
        try {
            await AsyncStorage.multiRemove(keys);
            console.log('Done.')
        } catch (e) {
            console.log("error", e);
        }
    };

    // remove all data local storage
    clearAll = async function () {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.log("error", e);
        }
        console.log('Done.')
    }

};
export default Storage;


// class Storage {
//     // Set data in localStorage
//     set = async (key, value) => {
//         try {
//             localStorage.setItem(key, value);
//         } catch (e) {
//             console.error("Error setting data:", e);
//         }
//     };

//     // Get data from localStorage
//     get = async (key, then) => {
//         try {
//             const data = localStorage.getItem(key);
//             then(data);
//         } catch (e) {
//             console.error("Error getting data:", e);
//         }
//     };

//     // Remove data from localStorage
//     remove = async (key) => {
//         try {
//             localStorage.removeItem(key);
//             console.log("Done.");
//         } catch (e) {
//             console.error("Error removing data:", e);
//         }
//     };

//     // Multi set data in localStorage
//     multiSet = async (keys) => {
//         try {
//             keys.forEach(([key, value]) => localStorage.setItem(key, value));
//         } catch (e) {
//             console.error("Error in multiSet:", e);
//         }
//     };

//     // Multi get data from localStorage
//     multiGet = async (keys, then) => {
//         try {
//             const data = keys.map((key) => [key, localStorage.getItem(key)]);
//             then(data);
//         } catch (e) {
//             console.error("Error in multiGet:", e);
//         }
//     };

//     // Multi remove data from localStorage
//     multiRemove = async (keys) => {
//         try {
//             keys.forEach((key) => localStorage.removeItem(key));
//             console.log("Done.");
//         } catch (e) {
//             console.error("Error in multiRemove:", e);
//         }
//     };

//     // Clear all data from localStorage
//     clearAll = async () => {
//         try {
//             localStorage.clear();
//             console.log("Done.");
//         } catch (e) {
//             console.error("Error clearing storage:", e);
//         }
//     };
// }

// export default Storage;
