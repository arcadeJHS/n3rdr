import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';
import user from './user.js';
import scoreboard from './scoreboard.js';
import game from './game.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isFetching: false
	},

	actions: {
		startFetching: (store) => {
            store.commit('startFetching');
		},
		stopFetching: (store) => {
            store.commit('stopFetching');
        }
	},

	mutations: {
        startFetching: (state) => {
			state.isFetching = true;
		},
		stopFetching: (state) => {
			state.isFetching = false;
		}
	},
	
	getters: {
        isFetching: state => state.isFetching
    },

    modules: {
        auth,
        user,
        scoreboard,
        game
    }
});
