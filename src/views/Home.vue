<template>
    <section class="view home">
		<div class="columns">
			<div class="column is-half is-offset-one-quarter is-full-touch">
				<article v-if="isLoggedIn" class="notification is-warning">
                    <router-link to="/user/game">
                        <p class="title has-text-centered is-uppercase">play!</p>
                    </router-link>
                </article>
				<article v-if="isLoggedIn" class="notification is-success">
                    <router-link to="/user/wins">
                        <p class="title has-text-centered is-uppercase">wins</p>  
                    </router-link>  
                </article>
				<article v-if="isLoggedIn" class="notification is-info">
                    <router-link to="/user/profile">
                        <p class="title has-text-centered is-uppercase">wallet</p>  
                    </router-link>  
                </article>
				<article class="notification is-danger">
                    <router-link to="/scoreboard">
                        <p class="title has-text-centered is-uppercase">scoreboard</p>
                    </router-link>
                </article>
				<article v-if="!isLoggedIn" class="notification is-info">
                    <router-link to="/login">
                        <p class="title has-text-centered is-uppercase">login</p>  
                    </router-link>  
                </article>
				<!--
				<article v-if="isLoggedIn" class="notification is-warning">
                    <a href="#" @click.prevent="logout()">
                        <p class="title has-text-centered is-uppercase">logout</p>  
                    </a>
                </article>
				-->
			</div>
		</div>
    </section>
</template>

<script>
import LoginHelper from '@/utils/LoginHelper.js';

export default {
    name: "Home",
    computed: {
        isLoggedIn () {
            return LoginHelper.isLoggedIn();
        }
    },
    methods: {
        logout () {
            LoginHelper.logout();
        }
    }
};
</script>

<style scoped lang="scss">
.notification a:not(.button) {
    text-decoration: none;
}
</style>
