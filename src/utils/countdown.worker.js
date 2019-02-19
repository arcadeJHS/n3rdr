let timeoutDeadline = null;

function countdown(deadline) {
	const now = new Date().getTime();
	//const expiration = new Date(deadline.slice(0,-1)).getTime();
	const expiration = new Date(deadline).getTime();
	const distance = expiration - now;
	
	if (distance < 0) {
		self.postMessage('EXPIRED');
		clearTimeout(timeoutDeadline);
	}
	else {
		const minutes = `0${Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))}`;
		const seconds = `0${Math.floor((distance % (1000 * 60)) / 1000)}`;
		const milliseconds = `${Math.floor(distance % 1000)}000`;
		self.postMessage(`${minutes.slice(minutes.length-2,minutes.length)}:${seconds.slice(seconds.length-2,seconds.length)}:${milliseconds.slice(0,3)}`);
		timeoutDeadline = setTimeout(() => {
			countdown(deadline);
		}, 1);
	}
}

export default function countdownWorker(self) {

	self.onmessage = (e) => {
		const data = e.data;
		switch (data.cmd) {
			case 'start-countdown':
				timeoutDeadline = setTimeout(() => {
					countdown(data.deadline);
				}, 1);
				break;
		}
	};

}