<template>
	<div id="app">
		<header-navigation></header-navigation>
		<b-loading :is-full-page="false" :active.sync="isFetching" :can-cancel="false"></b-loading>
		<main class="container">
			<router-view/>
		</main>
		<footer class="is-block has-text-centered">
			made with 
			<svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg>
			<symbol id="icon-heart" viewBox="0 0 32 32">
				<path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
			</symbol>
			by <a href="https://exmachina.ch" target="_blank"><img src="@/assets/img/exm-logo-white.png" width="35"></a>
		</footer>
		<easter-egg></easter-egg>
	</div>
</template>

<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import EasterEgg from "@/components/EasterEgg.vue";

export default {
	components: {
		HeaderNavigation,
		EasterEgg
	},
	computed: {
		isFetching () {
			return this.$store.getters['isFetching'];
		}
	}
};
</script>

<style scoped lang="scss">
#app {
	display: flex;
	height: 100vh;
	flex-direction: column;

	.loading-overlay {
		z-index: 5;
	}

	main.container {
		flex: 1;
		width: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
	}
	footer {
		font-size: 1rem;
		img {
			width: 2em;
		}
		.icon {
			display: inline-block;
			width: 0.8em;
			height: 0.8em;
			stroke-width: 0;
			stroke: #f4364c;
			fill: #f4364c;
		}
	}
}
</style>
