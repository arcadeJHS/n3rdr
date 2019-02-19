<template>
    <nav class="level is-mobile">
        <div class="level-left">
            <div>
                <p>
                    <span class="amount-type">
                    <svg class="icon icon-alarm"><use xlink:href="#icon-alarm"></use></svg>
                    <symbol id="icon-alarm" viewBox="0 0 32 32">
                        <path d="M16 4c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zM16 29.25c-6.213 0-11.25-5.037-11.25-11.25s5.037-11.25 11.25-11.25c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25zM29.212 8.974c0.501-0.877 0.788-1.892 0.788-2.974 0-3.314-2.686-6-6-6-1.932 0-3.65 0.913-4.747 2.331 4.121 0.851 7.663 3.287 9.96 6.643v0zM12.748 2.331c-1.097-1.418-2.816-2.331-4.748-2.331-3.314 0-6 2.686-6 6 0 1.082 0.287 2.098 0.788 2.974 2.297-3.356 5.838-5.792 9.96-6.643z"></path>
                        <path d="M16 18v-8h-2v10h8v-2z"></path>
                    </symbol>
                    <!--<span>Time</span>-->
                    </span>
                    <span class="amount-value">
                        <game-countdown></game-countdown>
                    </span>
                </p>
            </div>
        </div>
        <div class="level-right">
            <div>
            <p>
                <span class="amount-type">
                    <img src="@/assets/img/treasure.png" width="30">
                    <!--<span>Coins</span>-->
                </span>
                <span class="amount-value">{{availableCoins}}</span>
            </p>
            </div>
        </div>
    </nav>
</template>

<script>
import GameCountdown from '@/components/GameCountdown';

export default {
  name: "TimeAndCoins",
  components: {
    GameCountdown
  },
  props: ['availableCoins']
};
</script>

<style scoped lang="scss">
.amount-type {
    float: left;
    font-size: 0.8rem;
    text-align: center;
    width: 2rem;
    span {
        padding-top: 0.2rem;
        display: inline-block;
    }
    img {
        width: 1.6rem;
    }
}
.amount-value {
    margin-left: 0.2rem;
    font-size: 1.5rem;
    text-align: left;
}

p {
    color: #fff;
}
.icon {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    stroke-width: 0;
    stroke: #f5f5f5;
    fill: #f5f5f5;
    position: relative;
    top: 0.2rem;
}
</style>