<template>
  <div class="game-bet">
    <time-and-coins :available-coins="remainingCoins"></time-and-coins>
    <div class="columns">
      <div class="column">
        <p class="baloon left">
          Ok! So your answer is: <span class="has-text-weight-bold">{{selectedAnswer}}.</span>
          <span class="is-block">How many nerdcoins would you bet on your answer being correct?</span>
        </p>
      </div>
      <div class="column">
        <div class="amount-selector">
          <div class="bet-and-pot">
            <p class="bet-amount has-text-centered has-text-left-touch">{{betAmount}}</p>
            <span class="has-text-centered is-block">
              <span class="is-uppercase pot-label">jackpot</span>
              <span class="is-block is-size-4 pot-amount">{{jackpot}}</span>
            </span>
          </div>
          <div class="slider-container">
            <input type="range" :min="minAmount" :max="availableCoins" step="0.01" v-model="betAmount" class="slider">
            <span class="your-bet-text">your bet</span>
          </div>
        </div>
        <div class="actions">
          <button class="button is-large is-link is-fullwidth is-uppercase" @click="confirm" :disabled="confirmDisabled">
            Confirm
          </button>
          <router-link to="/user/game" class="button is-large is-danger is-fullwidth is-uppercase">
            Back
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAndCoins from '@/components/TimeAndCoins';

export default {
	name: "UserGameBet",
	components: {
		TimeAndCoins
	},
	props: ['answer'],
	data() {
		return {
			minAmount: 0,
			betAmount: 0
		};
	},
	computed: {
		selectedAnswer () {
			return this.$store.getters['game/selectedAnswer'](this.answer);
		},
		jackpot () {
			return this.$store.getters['game/jackpot'];
		},
		availableCoins () {
			return parseFloat(this.$store.getters['user/availableCoins']);
		},
		remainingCoins () {
			return (this.availableCoins - parseFloat(this.betAmount)).toFixed(2);
		},
		confirmDisabled () {
			var insertedAmount = parseFloat(this.betAmount);
			return !this.betAmount || insertedAmount <= this.minAmount || insertedAmount > this.availableCoins;
		},
		gameIsOver () {
			return this.$store.getters['game/gameIsOver'];
		}
	},
	watch: {
		gameIsOver: function (newVal, oldVal) {
			if (newVal === true && newVal != oldVal) {
				this.$router.replace('/user/game');
			}
		}
	},
	methods: {
		confirm () {
			this.$store.dispatch('startFetching');
			this.$store.dispatch('game/confirmBet', {
				answer: this.answer, 
				amount: this.betAmount
			}).then(() => {
				this.$store.dispatch('stopFetching');
				this.$router.push(`/user/game`);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.baloon {
  margin-left: 1rem;
}

.actions {
  .button {
    margin-bottom: 0.5rem;
  }
}

.amount-selector {
  /*
  padding-top: 0;
  @media screen and (min-width: 769px) {
    padding-top: 4rem; 
  }
  */

  .bet-and-pot {
    position: relative;
    > span {
      position: absolute; 
      right: 0.2rem; 
      top: 50%; 
      transform: translateY(-50%);
      .pot-label {
        font-size: 0.7rem;
      }
      .pot-amount {
        line-height: 1.5rem;
      }
    }
    .bet-amount {
      font-size: 5rem;
      line-height: 5rem;
      color: #fff;
    }
  }

  .slider-container {
    margin: 1rem 0 2rem 0;
    position: relative;

    .your-bet-text {
      position: absolute;
      text-align: center;
      left: 50%;
      top: 50%;
      pointer-events: none;
      text-transform: uppercase;
      transform: translate(-50%,-60%);
    }

    /* The slider itself */
    .slider {
      -webkit-appearance: none;  /* Override default CSS styles */
      appearance: none;
      height: 3rem; /* Specified height */
      background: #d3d3d3; /* Grey background */
      outline: none; /* Remove outline */
      opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
      -webkit-transition: .2s; /* 0.2 seconds transition on hover */
      transition: opacity .2s;
      width: 100%;
      border-radius: 4px;
    }

    /* Mouse-over effects */
    .slider:hover {
      opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */ 
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: 3rem; /* Set a specific slider handle width */
      height: 3rem; /* Slider handle height */
      background: #4CAF50; /* Green background */
      cursor: pointer; /* Cursor on hover */
      border-radius: 4px;
    }

    .slider::-moz-range-thumb {
      width: 3rem; /* Set a specific slider handle width */
      height: 3rem; /* Slider handle height */
      background: #4CAF50; /* Green background */
      cursor: pointer; /* Cursor on hover */
      border-radius: 4px;
    }
  }
}
</style>