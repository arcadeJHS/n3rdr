<template>
	<div class="view scoreboard">
		<div class="columns">
			<div class="column">
				<p v-if="scores && !scores.length">Waiting for players...</p>
				<ul>
					<li v-for="(item, index) in scores" :key="index">
						<avatar :class="'avatar--'+index.toString()"></avatar>
						<div class="score">
							<div class="user-team">
								<p>{{item.userName}}</p>
								<p>TEAM: {{item.team}}</p>
							</div>
							<div class="is-size-5 user-amount">{{item.amount}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from '@/components/Avatar';

export default {
	name: 'Scoreboard',
	components: {
		Avatar
	},
	data () {
		return {
			scores: null,
			getScoresTimeout: null
		};
	},
	mounted () {
		this.getScores();
	},
	destroyed () {
		clearTimeout(this.getScoresTimeout);
	},
	methods: {
		getScores () {
			this.$store.dispatch('startFetching');
			this.$store.dispatch('scoreboard/getScoreboard').then(scoreboard => {
				this.scores = scoreboard.scores;
				this.$store.dispatch('stopFetching');
				this.getScoresTimeout = setTimeout(this.getScores, (1*60)*1000);
			});
		}
	}
};
</script>

<style scoped lang="scss">
ul {
	padding-left: 0.5rem;
	li {
		padding: 0;
		position: relative;
		background-color: #fff;
		color: #666;
		border-radius: 6px;
		margin-bottom: 0.6rem;
		.avatar {
			display: inline-block;
			position: absolute;	
			top: 50%;
			transform: translateY(-50%);
		}
		.score {
			padding-left: 3em;
			padding-right: 0.5rem;
			.user-team {
				p {
					line-height: 1em;
					&:nth-child(1) {
						font-size: 1em;
						padding-top: 0.4em;
					}
					&:nth-child(2) {
						font-size: 0.6em;
						padding-top: 0.5em;
						padding-bottom: 1.4em;
					}
				}
			}
			.user-amount {
				position: absolute;
				right: 0.4em;
				bottom: 0.2em;
				line-height: 1em;
			}
		}
	}
}
</style>
