<template>
	<div class="user-wins">
		<div class="columns">
			<div class="column">
				<p v-if="!wins || !wins.length">No wins yet!</p>
				<ul>
					<li v-for="(item, index) in wins" :key="index">
						<p class="question-title has-text-weight-bold">{{item.gameTitle}}</p>
						<p>You bet: <span class="has-text-weight-bold">{{item.userBet}}</span> - You win: <span class="has-text-weight-bold">{{item.jackpot}}</span></p>
						<img class="coin" src="@/assets/img/coin.gif">
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserWins',
	mounted () {
		this.getWins();
	},
	computed: {
		wins () {
			return this.$store.getters['user/wins'];
		}
	},
	methods: {
		getWins () {
			this.$store.dispatch('startFetching');
			this.$store.dispatch('user/getWins').then(() => {
				this.$store.dispatch('stopFetching');
			});
		}
	}
};
</script>

<style scoped lang="scss">
ul {
	li {
		background-color: #fff;
		color: #666;
		border-radius: 6px;
		margin-bottom: 0.6rem;
		padding: 0.2rem 0.8rem;
		position: relative;
		.question-title {
			width: 85%;
		}
		.coin {
			position: absolute;
			right: -90px;
			top: -36px;
			width: 15rem;
		}
	}
}
</style>
