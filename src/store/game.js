import AuthHelper from "@/utils/AuthHelper.js";
import FetchHelper from "@/utils/FetchHelper.js";
import Endpoints from "@/utils/Endpoints.js";
import {EventBus} from '@/utils/EventBus.js';
import Notifications from "@/utils/Notifications.js";
import 'whatwg-fetch';

export default {
    namespaced: true,

    state: {
		game: null,
		oldGameId: null,
		currentAnswer: null,
		gameIsOver: true
    },
    
    actions: {
        getGame: (store) => {
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
                fetch(Endpoints.game, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
					if (!response.gameID) {
						response = store.state.game;
					}
					store.commit('initGame', response);
					let deadline = response ? response.deadLine : new Date().toISOString();
					EventBus.$emit('game-data-loaded', deadline);
                    resolve(response);
				})
                .catch(error => {alert(error); reject(error);});
            });
        },
        confirmBet: (store, bet) => {
            const url = `${Endpoints.game}/${store.state.game.gameID}/${bet.answer}/${bet.amount}`;
            const params = {
                credentials: 'same-origin',
                headers: Object.assign(AuthHelper.getAuthHeader(), {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"content-Type": "application/json"
				}),
                method: 'PUT'
			};

            return new Promise((resolve, reject) => {
                fetch(url, params)
                .then(FetchHelper.handleResponse)
                .then(response => {
					store.commit('setCurrentAnswer', bet.answer);
                    resolve(response);
				})
                .catch(error => {alert(error); reject(error);});
            });
		},
		gameOver: (store) => {
			Notifications.add({
				gameId: store.state.game.gameID,
				message: 'Time expired for current question.',
				type: 'expired'
			});
			store.commit('gameOver');
		},
		clearGame: (store) => {
			store.commit('clearGame');
		}
    },

    mutations: {
        initGame: (state, game) => {
			state.oldGameId = state.game ? state.game.gameID : null;
			if (state.game && game.gameID && game.gameID != state.game.gameID) {
				state.currentAnswer = null;
			}
			state.game = game;
			state.gameIsOver = false;
		},
		setCurrentAnswer: (state, answer) => {
			state.currentAnswer = answer;
		},
		gameOver: (state) => {
			state.gameIsOver = true;
		},
		clearGame: (state) => {
			state.game = null;
			state.oldGameId = null;
			state.gameIsOver = true;
		}
    },

    getters: {
        game: state => state.game,
        selectedAnswer: (state) => (answer) => {
			let option = answer || state.currentAnswer;
            return option ? state.game.options[option] : null;
        },
		jackpot: state => state.game.amount,
		deadline: state => state.game.deadLine,
		gameIsOver: state => state.gameIsOver,
		userBet: state => state.game.bet,
		oldGameId: state => state.oldGameId,
		currentAnswer: state => state.currentAnswer
    }
};
