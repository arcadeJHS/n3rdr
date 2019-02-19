import FetchHelper from "@/utils/FetchHelper.js";
import Endpoints from "@/utils/Endpoints.js";
import 'whatwg-fetch';

export default {
    namespaced: true,

    state: {
        scoreboard: null
    },
    
    actions: {
        getScoreboard: (store) => {
            const params = {
                credentials: 'same-origin',
                headers: {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				},
                method: 'GET'
			};

			return new Promise((resolve, reject) => {
                fetch(Endpoints.scoreBoard, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
                    store.commit('setScoreboard', response);
                    resolve(response);
				})
                .catch(error => {alert(error); reject(error);});
            });
        },
    },

    mutations: {
        setScoreboard: (state, scoreboard) => {
			scoreboard.scores = scoreboard.scores.sort((a, b) => {
				if (a.amount < b.amount) { return 1; }
				if (a.amount > b.amount) { return -1; }
				return 0;
			});
            state.scoreboard = scoreboard;
        }
    },

    getters: {}
};
