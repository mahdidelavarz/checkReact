// storage.js
const storage = {
    // Set data in localStorage
    set(key, value) {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (e) {
            console.error("Error setting data in localStorage:", e);
        }
    },

    // Get data from localStorage
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null; // Parse JSON or return null
        } catch (e) {
            console.error("Error getting data from localStorage:", e);
            return null; // Return null on error or invalid JSON
        }
    },

    // Remove data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            console.log("Data removed successfully.");
        } catch (e) {
            console.error("Error removing data from localStorage:", e);
        }
    },

    // Multi set data in localStorage
    multiSet(keys) {
        try {
            keys.forEach(([key, value]) => {
                const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
                localStorage.setItem(key, stringValue);
            });
        } catch (e) {
            console.error("Error in multiSet in localStorage:", e);
        }
    },

    // Multi get data from localStorage
    multiGet(keys) {
        try {
            return keys.map((key) => {
                const value = localStorage.getItem(key);
                try {
                    return [key, value ? JSON.parse(value) : null];
                } catch {
                    return [key, value]; // Fallback to raw string if JSON parsing fails
                }
            });
        } catch (e) {
            console.error("Error in multiGet from localStorage:", e);
            return []; // Return empty array on error
        }
    },

    // Multi remove data from localStorage
    multiRemove(keys) {
        try {
            keys.forEach((key) => localStorage.removeItem(key));
            console.log("Multiple items removed successfully.");
        } catch (e) {
            console.error("Error in multiRemove from localStorage:", e);
        }
    },

    // Clear all data from localStorage
    clearAll() {
        try {
            localStorage.clear();
            console.log("localStorage cleared successfully.");
        } catch (e) {
            console.error("Error clearing localStorage:", e);
        }
    },
};

export default storage;