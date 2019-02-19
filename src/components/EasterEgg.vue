<template>
<div class="easter-wrapper" :class="{'active': easterIsVisible}">
	<div id="easter" v-if="easterIsVisible">
		<div @click.prevent="hideEaster">
			<div class="half half-left"></div>
			<div class="half half-right"></div>
			<div class="text-container">
				<div class="text-left">
					<p v-for="(c, index) in easterTextLeft.split('').map(x => x.replace(/ /ig, '&nbsp;'))" :key="index" v-html="c"></p>
				</div>
				<div class="creator creator--one">
					<p v-for="(c, index) in easterTextRightOne.split('').map(x => x.replace(/ /ig, '&nbsp;'))" :key="index" v-html="c"></p>
				</div>
				<div class="creator creator--two">
					<p v-for="(c, index) in easterTextRightTwo.split('').map(x => x.replace(/ /ig, '&nbsp;'))" :key="index" v-html="c"></p>
				</div>
			</div>
		</div>
		<a class="tribute" href="https://www.usgamer.net/articles/warren-robinett-interview" target="_blank">
			a nerdic tribute
			<svg class="icon icon-new-tab"><use xlink:href="#icon-new-tab"></use></svg>
			<symbol id="icon-new-tab" viewBox="0 0 32 32">
				<path d="M6 2v24h24v-24h-24zM28 24h-20v-20h20v20zM4 28v-21l-2-2v25h25l-2-2h-21z"></path>
				<path d="M11 8l5 5-6 6 3 3 6-6 5 5v-13z"></path>
			</symbol>
		</a>
	</div>
	<div id="easter-trigger" :class="{'active': easterIsVisible}" @click.prevent="showEaster">
		<rhindle v-if="easterIsVisible && reverted"></rhindle>
		<span :class="{'reverted': reverted}">?</span>
	</div>
</div>
</template>

<script>
import Rhindle from '@/components/Rhindle';

export default {
	data() {
		return {
			easterIsVisible: false,
			reverted: false,
			easterTextRightOne: 'hc.anihcamxe@irelec.ocram',
			easterTextRightTwo: 'hc.anihcamxe@azzaip.oettam'
		};
	},
	components: {
		Rhindle
	},
	methods: {
		showEaster () {
			if (this.easterIsVisible && !this.reverted) {
				return this.reverse();
			}
			this.easterIsVisible = true;
			this.easterTextLeft = 'created by';
		},
		hideEaster () {
			this.reverted = false;
			this.easterIsVisible = false;
		},
		reverse () {
			this.easterTextRightOne = this.easterTextRightOne.split("").reverse().join("");
			this.easterTextRightTwo = this.easterTextRightTwo.split("").reverse().join("");
			this.reverted = true;
		}
	}
};
</script>

<style scoped lang="scss">
@keyframes unite {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 50%;
  }
}
@keyframes moveText {
  0% {
    left: -20%;
  }
  100% {
    left: 40%;
  }
}
@keyframes moveTextMobile {
  0% {
    left: -30%;
  }
  100% {
    left: 35%;
  }
}
* {
	font-family: 'PressStart2P', sans-serif;
}
#easter, 
.easter-wrapper.active {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1000;
	.half {
		position: absolute;
		width: 0;
		height: 100%;
		background-color: rgb(178,178,178);
		border-top: 2rem solid rgb(140,88,175);
		border-bottom: 2rem solid rgb(140,88,175);
		animation-name: unite;
		animation-delay: 0s;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
		&.half-left {
			left: 0px;
		}
		&.half-right {
			right: 0px;
		}
	}
	.text-container {
		position: absolute;
		animation-name: moveTextMobile;
		width: 30%;
		left: -30%;
		@media screen and (min-width: 769px) {
			animation-name: moveText;
			width: 20%; 
			left: -20%;
		}
		height: 100%;
		font-size: 2.2vh;
		text-align: center;
		background-color: rgb(178,178,178);
		border-bottom: 2rem solid rgb(140,88,175);
		color: rgb(23,92,80);
		animation-delay: 0s;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
		p {
			margin-bottom: 0;
		}
		.text-left {
			position: absolute;
			top: 0;
			left: 15%;
			@media screen and (min-width: 769px) {
				left: 25%; 
			}
		}
		.creator {
			position: absolute;
			top: 0;
			&.creator--one {
				right: 40%;
				@media screen and (min-width: 769px) {
					right: 45%; 
				}
			}
			&.creator--two {
				right: 10%;
				@media screen and (min-width: 769px) {
					right: 25%; 
				}
			}
		}
	}
	.tribute {
		position: absolute;
		bottom: 0;
		display: block;
		left: 0;
		width: 100%;
		color: #fff;
		text-align: center;
		font-size: 0.6rem;
		line-height: 2rem;
		&:hover {
			text-decoration: underline;
		}
		.icon {
			display: inline-block;
			width: 1em;
			height: 1em;
			stroke-width: 0;
			stroke: #fff;
			fill: #fff;
			color: #fff;
		}
	}
}
#easter-trigger {
	/*
	width: 0.15vh;
    height: 0.15vh;
	background-color: #4a4a4a;
	*/
	position: absolute;
	z-index: 10000;
    cursor: pointer;
	span {
		color: #fc0;
		font-size: 0.4vh;
		@media screen and (min-width: 769px) {
			font-size: 0.45vh;
		}
		display: block;
	}
	&.active {
		width: 1rem;
		height: 1rem;
		background-color: #8c58af;
		span {
			font-size: 1em;
			&.reverted {
				display: none;
			}
		}
	}
	.rhindle {
		position: absolute;
		left: 2em;
		top: -3em;
	}
}
</style>