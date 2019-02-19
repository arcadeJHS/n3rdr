import AuthHelper from "@/utils/AuthHelper.js";
import FetchHelper from "@/utils/FetchHelper.js";
import Endpoints from "@/utils/Endpoints.js";
import 'whatwg-fetch';

export default {
    namespaced: true,

    state: {
		user: null,
		wins: null
    },
    
    actions: {
        getUser: (store) => {
            const params = {
                credentials: 'same-origin',
                headers: Object.assign(AuthHelper.getAuthHeader(), {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				}),
                method: 'GET'
			};
			
			return new Promise((resolve, reject) => {
                fetch(Endpoints.user, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
                    store.commit('setUser', response);
                    resolve(response);
				})
                .catch(error => {alert(error); reject(error);});
            });
		},
		clearUser: (store) => {
			store.commit('clearUser');
		},
		getWins: (store) => {
			const params = {
                credentials: 'same-origin',
                headers: Object.assign(AuthHelper.getAuthHeader(), {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				}),
                method: 'GET'
			};
      
            return new Promise((resolve, reject) => {
                fetch(Endpoints.userWins, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
                    store.commit('setWins', response);
                    resolve(response);
				})
                .catch(error => {alert(error); reject(error);});
            });
		}
    },

    mutations: {
        setUser: (state, user) => {
            state.user = user;
		},
		clearUser: (state) => {
			state.user = null;
		},
		setWins: (state, wins) => {
			state.wins = wins;
		}
    },

    getters: {
        user: state => state.user,
		availableCoins: state => state.user.amount,
		wins: state => state.wins
    }
};
