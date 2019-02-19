<template>
	<div class="game">
		<div v-if="game">
			<time-and-coins :available-coins="availableCoins"></time-and-coins>
			<div v-if="game.question && !gameIsOver" class="has-text-right has-text-centered-mobile game-title">
				<span class="is-block-touch" v-if="!game.lastQuestion">
					<coin-beast-logo></coin-beast-logo> 
					asks you
				</span>
				<span class="is-block-touch" v-if="game.lastQuestion">
					It is the last question! Get ready for a winner!
				</span>
				<!-- <span class="title">{{game.title}}</span> -->
			</div>
			<div class="columns">
				<div class="column is-one-quarter">
					<coin-beast font-size="1rem"></coin-beast>
				</div>
				<div class="column">
					<p v-if="game.question && !gameIsOver" class="baloon left is-hidden-touch">{{game.question}}</p>
					<p v-if="game.question && !gameIsOver" class="baloon top is-hidden-desktop">{{game.question}}</p>
					<div v-if="!gameIsOver">
						<ul v-if="!userBet" class="responses">
							<li v-for="(value, key) in game.options" :key="key">
								<router-link :to="`/user/bet/${key}`" :class="{'is-primary': currentAnswer == key}" class="button is-large is-fullwidth has-text-left has-text-weight-bold">
									<span class="rounded-number">{{{1:'A',2:'B',3:'C'}[key]}}</span> {{value}}
									<span v-if="currentAnswer == key" class="checked">
										<svg class="icon icon-checkmark"><use xlink:href="#icon-checkmark"></use></svg>
										<symbol id="icon-checkmark" viewBox="0 0 32 32">
											<path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
										</symbol>
									</span>
								</router-link>
							</li>
						</ul>
						<div v-if="userBet">
							<div class="tile is-ancestor">
								<div class="tile is-parent is-vertical">
									<article class="tile is-child is-12">
										<p class="heading has-text-centered is-size-6">you bet</p>
										<p class="title has-text-centered has-text-white">{{userBet.amount}}</p>
									</article> 
									<article class="tile is-child is-12">
										<p class="heading has-text-centered is-size-6">on</p>
										<p class="title has-text-centered has-text-white">{{selectedAnswer}}</p>
									</article>
									<article class="tile is-child is-12">
										<p class="heading has-text-centered is-size-6">the jackpot</p>
										<p class="title has-text-centered has-text-white">{{jackpot}}</p>
									</article>
								</div>
							</div>
						</div>
					</div>
					<div v-if="gameIsOver" class="game-over">
						<b-loading :is-full-page="false" :active="true" :can-cancel="false"></b-loading>
						<p class="title has-text-centered has-text-white">Time Expired</p>
						<p class="has-text-centered has-text-white">A new question will load shortly...</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CoinBeastLogo from '@/components/CoinBeastLogo';
import CoinBeast from '@/components/CoinBeast';
import TimeAndCoins from '@/components/TimeAndCoins';
import {EventBus} from "@/utils/EventBus.js";

let getGameTimeout = null;

EventBus.$on("stop-polling-game", () => {
	clearTimeout(getGameTimeout);
});

export default {
	name: 'UserGame',
	components: {
		CoinBeastLogo,
		CoinBeast,
		TimeAndCoins
	},
	computed: {
		game () {
			return this.$store.getters['game/game'];
		},
		availableCoins () {
			return parseFloat(this.$store.getters['user/availableCoins']);
		},
		userBet () {
			return this.$store.getters['game/userBet'];
		},
		currentAnswer () {
			return this.$store.getters['game/currentAnswer'];
		},
		selectedAnswer () {
			let option = this.userBet ? this.userBet.option : null;
			return this.$store.getters['game/selectedAnswer'](option);
		},
		gameIsOver () {
			return this.$store.getters['game/gameIsOver'];
		},
		jackpot () {
			return this.$store.getters['game/jackpot'];
		}
	},
	watch: {
		gameIsOver: function (newVal, oldVal) {
			if (newVal === true && newVal != oldVal) {
				getGameTimeout = setTimeout(this.getGame.bind(this), 5000);
			}
		}
	},
	mounted() {
		this.getGame();
	},
	destroyed () {
		this.stopGetGameTimeout();
	},
	methods: {
		getGame() {
			this.stopGetGameTimeout();
			this.$store.dispatch('game/getGame')
			.then(() => {
				this.$store.dispatch('user/getUser');
			});
		},
		stopGetGameTimeout () {
			clearTimeout(getGameTimeout);
		}
	}
};
</script>

<style scoped lang="scss">
$background-color: #00d1b2;
.checked {
	position: absolute;
	right: 0px;
	top: 0px;
	.icon {
		display: inline-block;
		width: 3rem;
		height: 3rem;
		stroke-width: 0;
		stroke: #fff;
		fill: #fff;
	}
}
.game-title {
	margin-bottom: 2em;
	font-style: inherit;
	@media screen and (min-width: 769px) {
		margin-bottom: 1em;
	}
	span {
		color: #fff;
	}
}
.responses {
	li {
		a {
			display: block;
			margin-bottom: 0.2em;
			position: relative;
			padding-left: 3.5rem;

			height: unset!important;
			white-space: normal!important;

			&.is-primary {
				border: 1px solid white;
			}
			.rounded-number {
				width: 2.2rem;
				height: 2.2rem;
				background: $background-color;
				border: 0.1rem solid darken($background-color, 5%);
				color: #fff;
				text-align: center;
				border-radius: 50%;
				line-height: 2.2rem;
				box-sizing: content-box;
				display: inline-block;
				top: 50%;
				left: 0.5rem;
				position: absolute;
				transform: translateY(-50%);
			}
		}
	}
}
.game-over {
	border: 4px solid #fff;
	border-radius: 10px;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
	position: relative;
	margin-top: 1rem;
	p {
		margin-bottom: 0;
	}
}
</style>