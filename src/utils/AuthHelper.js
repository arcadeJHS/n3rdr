const exmTokenStorageKey = 'exmBetToken';

export default {
    exmTokenStorageKey: exmTokenStorageKey,
    encodeAuthToken (username, password) {
        return window.btoa(username + ":" + password);
    },
    getAuthHeader (manualToken) {
        let token = localStorage.getItem(exmTokenStorageKey) || manualToken;
        if (token) {
            return {'Authorization': 'Basic ' + token};
        } else {
            return {};
        }
    }
};