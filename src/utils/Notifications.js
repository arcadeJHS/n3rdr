import Vue from 'vue';

class Notifications {
	constructor () {
		this.queue = [];
		this.show = {
			'expired' (message) {
				Vue.prototype.$toast.open({duration: 5000, message: message});
			},
			'success' (message) {
				Vue.prototype.$toast.open({duration: 5000, type: 'is-success', message: message});
			}
		};
	}

	cleanQueue () {
		let now = +new Date;
		this.queue = this.queue.filter(function (n) {
			let minutes = (now - n.timestamp) / (60 * 1000);
			return minutes < 10;
		});
	}

	showNotifications () {
		this.queue.forEach(function (n) {
			if (!n.sent) {
				this.show[n.type](n.message);
				n.sent = true;
			}
		}.bind(this));
	}

	add (item) {
		let exists = this.queue.find(function (q) {
			return q.gameId == item.gameId && q.type == item.type;
		});
		if (!exists) {
			item.sent = false;
			item.timestamp = +new Date;
			this.queue = this.queue.concat(item);
		}

		this.showNotifications();
		this.cleanQueue();
	}
}

export default new Notifications();