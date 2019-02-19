<template>
    <span>{{remaining}}</span>
</template>

<script>
import Engine from '@/utils/Engine';

const gameOver = 'Time Expired';

export default {
    name: "GameCountdown",
    data () {
        return {
            remaining: this.$store.getters['game/gameIsOver'] ? gameOver : ''
        };
	},
	mounted () {
		Engine.subscribe(data => {
			this.remaining = (data == 'EXPIRED') ? gameOver : data;
		});
	}
};
</script>