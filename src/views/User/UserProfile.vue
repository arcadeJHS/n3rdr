<template>
	<div class="view user-profile">
		<div v-if="user" class="tile is-ancestor">
			<div class="tile is-parent is-12 is-vertical">
				<article class="tile is-child is-12">
					<avatar></avatar>
				</article> 
				<p class="title has-text-centered">Your Wallet</p>
				<article class="tile is-child is-12">
					<p class="heading has-text-centered">user</p>
					<p class="title has-text-centered is-size-4-mobile">{{user.name}}</p>
				</article> 
				<article class="tile is-child is-12">
					<p class="heading has-text-centered">team</p>
					<p class="title has-text-centered is-size-4-mobile">{{user.team}}</p>
				</article> 
				<article class="tile is-child is-12">
					<p class="heading has-text-centered">balance</p>
					<p class="title has-text-centered">{{user.amount}} <span class="is-size-6">nerdcoins</span></p>
				</article> 
			</div>
		</div>
	</div>
</template>

<script>
import Avatar from '@/components/Avatar';

export default {
	name: "UserProfile",
	components: {
		Avatar
	},
	data() {
		return {
			user: null
		};
	},
	mounted () {
		this.getUser();
	},
	methods: {
		getUser() {
			this.$store.dispatch('startFetching');
			this.$store.dispatch('user/getUser').then(user => {
				this.user = user;
				this.$store.dispatch('stopFetching');
			});
		}
	}
};
</script>

<style scoped lang="scss">
* {
	color: #fff;
}
.avatar {
	font-size: 10px;
	margin-bottom: 3rem;
	@media screen and (min-width: 769px) {
		margin-bottom: 1rem;
	}
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	&:before {
		border: 8px solid #fff;
	}
}
</style>
