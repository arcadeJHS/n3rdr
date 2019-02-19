import AuthHelper from "@/utils/AuthHelper.js";
import FetchHelper from "@/utils/FetchHelper.js";
import Endpoints from "@/utils/Endpoints.js";
import 'whatwg-fetch';

export default {
    namespaced: true,

    state: {
        isLoggedIn: !!localStorage.getItem(AuthHelper.exmTokenStorageKey),
    },
    
    actions: {
        login: (store, userData) => {
            const authToken = AuthHelper.encodeAuthToken(userData.username, userData.password);
            const params = {
                credentials: 'same-origin',
                headers: Object.assign(AuthHelper.getAuthHeader(authToken), {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				}),
                method: 'POST',
                body: JSON.stringify({username: userData.username, password: userData.password})
            };
      
            return new Promise((resolve, reject) => {
                fetch(Endpoints.login, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
                    localStorage.setItem(AuthHelper.exmTokenStorageKey, authToken);
                    store.commit('setLogState', response);
                    resolve(response);
                })
                .catch(error => {alert(error); reject(error);});
            });
        },
        logout: (store) => {
            return new Promise((resolve) => {
				localStorage.removeItem(AuthHelper.exmTokenStorageKey);
				store.dispatch('user/clearUser', null, {root: true});
				store.dispatch('game/clearGame', null, {root: true});
                store.commit('clearLogState');
                resolve();
            });
		},
		register: (store, email) => {
			const url = `${Endpoints.register}/${email}`;
            const params = {
                credentials: 'same-origin',
                headers: {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				},
                method: 'POST'
            };
      
            return new Promise((resolve, reject) => {
                fetch(url, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {alert(error); reject(error);});
            });
        },
    },

    mutations: {
        setLogState: (state) => {
            state.isLoggedIn = true;
        },
        clearLogState: (state) => {
            state.isLoggedIn = false;
        }
    },

    getters: {
        isLoggedIn: (state) => () => {
            return state.isLoggedIn;
        }
    }
};
