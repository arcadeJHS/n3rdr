<template>
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <h1 class="has-text-weight-bold" style="font-size: 2em;">
                        <!--<img src="@/assets/img/exm-logo.png">-->
						<span style="color: #b3b3b3;">n3</span>
						<span style="color: #3273dc;">r</span>
						<span style="color: #b3b3b3;">D</span>
						<span style="color: #3273dc;">r</span>
                        <svg class="icon icon-coin-dollar"><use xlink:href="#icon-coin-dollar"></use></svg>
						<symbol id="icon-coin-dollar" viewBox="0 0 32 32">
                            <path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM15 29c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12zM16 16v-4h4v-2h-4v-2h-2v2h-4v8h4v4h-4v2h4v2h2v-2h4l-0-8h-4zM14 16h-2v-4h2v4zM18 22h-2v-4h2v4z"></path>
                        </symbol>
                    </h1>
                </router-link>
                <div    class="navbar-burger burger" 
                        data-target="navMenu"
                        @click="toggleMenu"
                        :class="{'is-active': isActive}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="navbar-menu" :class="{'is-active': isActive}">
                <div class="navbar-end">
                    <router-link class="navbar-item has-text-weight-bold" to="/">Home</router-link>
                    <router-link class="navbar-item has-text-weight-bold" to="/gamerules">Game Rules</router-link>
                    <!-- <router-link v-if="isLoggedIn" class="navbar-item has-text-weight-bold" to="/user/game">Current Game</router-link> -->
                    <!-- <router-link v-if="isLoggedIn" class="navbar-item has-text-weight-bold" to="/user/profile">Profile</router-link> -->
                    <!-- <router-link class="navbar-item has-text-weight-bold" to="/betslist">Bets List</router-link> -->
                    <!-- <router-link class="navbar-item has-text-weight-bold" to="/scoreboard">Scoreboard</router-link> -->
                    <router-link v-if="!isLoggedIn" class="navbar-item has-text-weight-bold" to="/login">Login</router-link>
                    <a v-if="isLoggedIn" href="#" class="navbar-item has-text-weight-bold" @click.prevent="logout()">Logout</a>
					<a class="navbar-item has-text-weight-bold" target="_blank" href="https://exmachina.ch"><img src="@/assets/img/exm-logo.png" width="35"></a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import LoginHelper from '@/utils/LoginHelper.js';
import {EventBus} from '@/utils/EventBus.js';

export default {
	name: "MainNavigation",
    data () {
        return {
            isActive: false
        };
    },
    mounted () {
        EventBus.$on('close-navbar-menu', () => {this.isActive = false;});
    },
    computed: {
        isLoggedIn () {
            return LoginHelper.isLoggedIn();
        }
    },
    methods: {
        toggleMenu () {
            this.isActive = !this.isActive;
        },
        logout () {
            LoginHelper.logout();
        }
    }
};
</script>

<style scoped lang="scss">
.navbar-brand {
    h1 img {
        padding-left: 0.2em;
        padding-right: 0.2em;
    }
    .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke-width: 0;
        stroke: #00d1b2;
        fill: #00d1b2;
        transform: translateY(2px);
		margin-left: 0.2em;
    }
    a, a:hover {
        color: #00d1b2;
        padding-top: 4px;
        padding-bottom: 0;
    }
    .navbar-burger {
        span {
            color: #00d1b2;
        }
        &:hover {
            background-color: transparent;
        }
    }
}
a {
    font-weight: bold;
    &.router-link-exact-active {
        color: #42b983;
    }
}
</style>