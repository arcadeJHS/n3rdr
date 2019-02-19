//import webworkify from "webworkify-webpack";
import {EventBus} from "@/utils/EventBus.js";
import store from '@/store';
import Notifications from "@/utils/Notifications.js";


function run(fn) {
	return new Worker(URL.createObjectURL(new Blob(['('+fn+')()'])));
}

function countdownWorker() {

	function countdown(deadline, time) {
		clearTimeout(time);
		let now = new Date().getTime();
		let expiration = new Date(deadline).getTime();
		//let expiration = new Date(deadline.slice(0,-1)).getTime();
		
		let distance = expiration - now;
		if (distance < 0) {
			self.postMessage('EXPIRED');
		}
		else {
			let minutes = `0${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}`;
			let seconds = `0${Math.floor((distance % (1000 * 60)) / 1000)}`;
			let milliseconds = `${Math.floor(distance % 1000)}000`;
			self.postMessage(`${minutes.slice(minutes.length-2,minutes.length)}:${seconds.slice(seconds.length-2,seconds.length)}:${milliseconds.slice(0,3)}`);
			let timer = setTimeout(() => {
				countdown(deadline, timer);
			}, 1);
		}
	}

	self.onmessage = (e) => {
		let data = e.data;
		switch (data.cmd) {
			case 'start-countdown':
				countdown(data.deadline);
				break;
		}
	};

}

class Engine {
	constructor () {
		//this.countdown = webworkify(require.resolve("@/utils/countdown.worker.js"));
		this.countdown = run(countdownWorker);
		this.subscribers = [];
		this.countdown.onmessage = e => {
			this.subscribers.forEach(fn => fn(e.data));
		};
	}

	subscribe (fn) {
		this.subscribers = this.subscribers.concat(fn);
	}
}

const _E = new Engine();

let timeoutWins = null;

function pollUserWins (time) {
	clearTimeout(time);
	store.dispatch('user/getWins').then(response => {
		let win = response.find(function(i) { return i.gameId == store.state.game.oldGameId; });
		if (win) {
			Notifications.add({
				gameId: win.gameId,
				message: `Cool! You win ${win.jackpot} nerdcoins!`,
				type: 'success'
			});
		}
		else {
			timeoutWins = setTimeout(() => {pollUserWins(timeoutWins);}, 5000);
		}
	});
}

_E.subscribe(data => {
	if (data == 'EXPIRED') {
		store.dispatch('game/gameOver');
		pollUserWins(timeoutWins);
	}
});

EventBus.$on("game-data-loaded", deadline => {
	_E.countdown.postMessage({cmd: "start-countdown", deadline: deadline});
});

EventBus.$on("stop-polling-userwins", () => {
	clearTimeout(timeoutWins);
});

export default _E;
