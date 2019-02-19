<template>
  <section class="view game-rules">
    <h1 class="title">
		<svg class="icon icon-gamepad"><use xlink:href="#icon-gamepad"></use></svg>
		<symbol id="icon-gamepad" viewBox="0 0 33 32">
			<path d="M23.014 4.459c-1.416 0-4.166 2-6.5 2s-5.25-2-6.5-2c-8.583 0-13.5 23.082-7.083 23.082 5.417 0 6.146-6.75 13.562-6.75 6 0 9.521 6.668 13.521 6.668 6.416 0 1.584-23-7-23zM9.513 17.459c-2.485 0-4.5-2.016-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5c0 2.484-2.014 4.5-4.5 4.5zM21.451 14.959c-0.553 0-1-0.447-1-1s0.447-1 1-1 1 0.447 1 1-0.447 1-1 1zM24.514 17.959c-0.553 0-1-0.447-1-1s0.447-1 1-1 1 0.447 1 1-0.448 1-1 1zM24.514 11.959c-0.553 0-1-0.447-1-1s0.447-1 1-1 1 0.447 1 1-0.448 1-1 1zM27.514 14.959c-0.553 0-1-0.447-1-1s0.447-1 1-1 1 0.447 1 1-0.448 1-1 1zM9.513 10.459c-1.38 0-2.5 1.119-2.5 2.5s1.12 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5z"></path>
		</symbol>
		How to play
		<span style="color: #e5e5e5;">n3</span>
		<span style="color: #3273dc;">r</span>
		<span style="color: #e5e5e5;">D</span>
		<span style="color: #3273dc;">r</span>
	</h1>
    <p>
		<coin-beast font-size="0.4em"></coin-beast>
		After mindblowing cyber-genetical experiments mixing AI, robotics, big data, blockchain, and a handful of other buzzwords, a new dangerous creature was born: <coin-beast-logo></coin-beast-logo>!
	</p>
    <p>brrr....</p>
	<p>Name it Grundle, Rhindle, or Yorgle. You choose. <br/> Our creature is a new born, it is craving for knowledge. And it needs to know about its creators, people known as nerd...</p>
	<p class="has-text-centered">
		IIINPUUUT!
		<img class="johnny" src="@/assets/img/johnny5.png" width="66">
	</p>
	<p>As you are familiar with nerds, will you help our creature to know about its parents?</p>
	<p>
		The creature is very generous, so it will compensate you with nerdcoins for your bits of knowledge about nerds. <br/> At the end of the day the most knowledgeable about nerds will also earn the title of</p>
		<p>"The Most Nerdish Beast in the Universe"</p>
	<p>
		<img class="smartwatch" src="@/assets/img/smartwatch.png" width="125">
		and win a cool <a href="https://www.mobvoi.com/pages/ticwatchse" target="_blank">Mobvoi Ticwatch E</a> smartwatch!
	</p>
	<p>Woah!</p>
	<p>Award ceremony to be held at <span class="has-text-weight-bold underline">6pm</span> at the <span class="has-text-weight-bold underline">EX MACHINA</span> booth.</p>
  </section>
</template>

<script>
import CoinBeastLogo from '@/components/CoinBeastLogo';
import CoinBeast from '@/components/CoinBeast';

export default {
  name: "GameRules",
  components: {
	CoinBeastLogo,
	CoinBeast
  }
};
</script>

<style scope lang="scss">
@keyframes rotateJoystick {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(360deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.game-rules {
	.beast {
		float: left;
		margin: 0 2em 0 0;
	}
	.question-sample {
		width: 65vw;
		float: right;
		margin-left: 1em;
		@media screen and (min-width: 769px) {
			width: 35vw; 
		}
	}
	.johnny {
		width: 4em;
	}
	.treasure {
		vertical-align: text-bottom;
		margin-right: 0.5em;
	}
	.title {
		color: #fff;
	}
	p {
		margin-bottom: 1em;
	}
	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;
		stroke-width: 0;
		stroke: #3273dc;
		fill: #3273dc;
		color: #3273dc;
	}
	.icon-gamepad {
		width: 1.029296875em;
		transform: rotate(0deg);
		animation: rotateJoystick 3s infinite;
	}
	.underline {
		text-decoration: underline;
	}
	.smartwatch {
		float: right;
		width: 8rem;
		@media screen and (min-width: 769px) {
			float: left;
			margin-right: 0.5rem; 
		}
	}
}
</style>