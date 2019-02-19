<template>
  <div class="beast" :style="{fontSize: fontSize||'1em'}">
    <span class="upper">
      <div class="body">
        <div class="coin-content">
          <svg class="icon icon-dollar-sign"><use xlink:href="#icon-dollar-sign"></use></svg>
          <symbol id="icon-dollar-sign" viewBox="0 0 24 24">
            <path d="M14.5 11h-1.5v-5h4c0.6 0 1-0.4 1-1s-0.4-1-1-1h-4v-3c0-0.6-0.4-1-1-1s-1 0.4-1 1v3h-1.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5h1.5v5h-5c-0.6 0-1 0.4-1 1s0.4 1 1 1h5v3c0 0.6 0.4 1 1 1s1-0.4 1-1v-3h1.5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5zM9.5 11c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5h1.5v5h-1.5zM14.5 18h-1.5v-5h1.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5z"></path>
          </symbol>
          <img class="logo" src="@/assets/img/exm-logo.png">
        </div>
      </div>
      <div class="head">
        <div class="eye one"></div>
        <div class="eye two"></div>
        <div class="ear one"></div>
        <div class="ear two"></div>
        <div class="nostril one"></div>
        <div class="nostril two"></div>
      </div>
    </span>
    <div class="legs">
      <div class="leg"></div>
      <div class="leg"></div>
      <div class="leg"></div>
      <div class="leg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinBeast",
  props: ['fontSize']
};
</script>

<style scoped lang="scss">
$skin: rgb(51,51,51);
$coin-color: #fc0;
$coin-shadow-color: darken($coin-color, 4%);

@keyframes bouncing {
  0% {
    top: 0;
  }
  50% {
    top: 0.2em;
  }
}

@keyframes rotateEarOne {
  0% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

@keyframes rotateEarTwo {
  0% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

@keyframes shadow {
  0% {
    width: 90%;
  }
  50% {
    width: 100%;
  }
}

@keyframes rotateBody {
  0% {
    transform: rotate(15deg);
  }
  5% {
    transform: rotate(1095deg);
  }
  100% {
    transform: rotate(1095deg);
  }
}

@keyframes rotateEye {
  0% {
    left: 4px;
  }
  25% {
    left: 0;
  }
  50% {
    left: 4px;
  }
  75% {
    left: 0;
  }
}

.beast {
  display: inline-block;
  position: relative;
  font-size: 1em;
  * {
    transition: transform 0.3s;
  }
  .upper {
    position: relative;
    top: 0;
    animation: bouncing 1s infinite;
    z-index: 2;
  }
  .head {
    display: inline-block;
    width: 5em;
    height: 5em;
    border-radius: 100%;
    background: $skin;
    vertical-align: middle;
    position: relative;
    top: 0.6em;
    left: -0.4em;

    &:before {
      content: "";
      display: inline-block;
      width: 80%;
      height: 50%;
      background: $skin;
      position: absolute;
      bottom: 0;
      right: -10%;
      border-radius: 50% 40%;
    }
    .eye {
        width: 1.25em;
        height: 1.25em;
        &:before {
          right: 30%;
        }
        display: inline-block;
        border-radius: 100%;
        background: white;
        position: absolute;
        overflow: hidden;
        border: 1px solid #eee;
        &:before {
            content: "";
            display: inline-block;
            background: black;
            /*width: 50%;*/
            width: 80%;
            height: 50%;
            left: 4px;
            /*border-radius: 100%;*/
            border-radius: 50%;
            position: absolute;
            /*bottom: 10%;*/
            transition: all 0.3s;
            animation: rotateEye 10s infinite;
        }
      &.one {
        right: -2%;
        top: 1.7em;
      }
      &.two {
        right: 2em;
        top: 1.7em;
      }
    }
    .ear {
      background: $skin;
      width: 50%;
      height: 30%;
      border-radius: 100%;
      position: absolute;
      &.one {
        left: -10%;
        top: 5%;
        transform: rotate(-30deg);
        animation: rotateEarOne 1s infinite;
      }
      &.two {
        top: 2%;
        right: -5%;
        transform: rotate(20deg);
        animation: rotateEarTwo 1s infinite;
      }
    }
    .nostril {
        width: 0.5em;
        height: 0.5em;
        display: inline-block;
        border-radius: 100%;
        background: white;
        position: absolute;
        overflow: hidden;
        &.one {
            right: 0;
            top: 3.5em;
        }
        &.two {
            right: 1.2em;
            top: 3.5em;
        }
    }
  }
  .body {
    display: inline-block;
    width: 7em;
    height: 7em;
    border-radius: 100%;
    border: 0.4em dashed $coin-shadow-color;
    background-color: $coin-color;
    position: relative;
    vertical-align: middle;
    margin-right: -3em;
    /*box-shadow: inset -10px -10px 0px $coin-shadow-color;*/
    transform: rotate(15deg);
    animation-name: rotateBody;
    animation-delay: 5s;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-timing-function: ease;

    .coin-content {
        transform-origin: center;
        .logo{
            width: 40%;
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
        }
        .icon {
            position: absolute;
            top: 10%;
            left: 50%;
            display: inline-block;
            width: 60%;
            height: 60%;
            stroke-width: 0;
            stroke: #ebbc00;
            fill: #ebbc00;
			color: #ebbc00;
            transform: translateX(-50%);
        }
    }
  }
  .legs {
    display: inline-block;
    position: absolute;
    top: 75%;
    left: 12%;
    z-index: 1;
    .leg {
      display: inline-block;
      background: darken($skin, 5%);
      width: 0.6em;
      height: 2.2em;
      margin: 0.2em;
    }
  }
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 105%;
    width: 90%;
    height: 10%;
    border-radius: 100%;
    background: rgba(black, 0.1);
    animation: shadow 1s infinite;
  }
}
</style>
