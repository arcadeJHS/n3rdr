import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from './views/Home.vue';
import LoginHelper from '@/utils/LoginHelper.js';
import { EventBus } from '@/utils/EventBus.js';

Vue.use(Router);

export const router = new Router({
	routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			//meta: {bodyClass: 'background-white'},
			component: () => import('./views/Login.vue')
		},
		{
			path: '/user',
			redirect: '/user/profile',
			name: 'user',
			meta: { requiresAuth: true },
			component: () => import('./views/User/User.vue'),
			children: [
				{
					path: 'profile',
					name: 'profile',
					component: () => import('./views/User/UserProfile.vue')
				},
				{
					path: 'wins',
					name: 'wins',
					component: () => import('./views/User/UserWins.vue')
				},
				{
					path: 'game',
					name: 'game',
					component: () => import('./views/User/UserGame.vue'),
					beforeEnter: (to, from, next) => {
						if (!store.getters['user/user']) {
							store.dispatch('user/getUser').then(() => {
								next({
									path: to.path,
									replace: true
								});
							});
						}
						else {
							next();
						}
					}
				},
				{
					path: 'bet',
					redirect: '/user/game'
				},
				{
					path: 'bet/:answer',
					props: true,
					name: 'userGameBet',
					component: () => import('./views/User/UserGameBet.vue'),
					beforeEnter: (to, from, next) => {
						if (!store.getters['user/user']) {
							store.dispatch('user/getUser').then(() => {
								next({
									path: to.path,
									replace: true
								});
							});
						}
						else if (!store.getters['game/game']) {
							next({
								path: '/user/game'
							});
						} 
						else if (store.getters['game/gameIsOver']) {
							next({
								path: '/user/game'
							});
						}
						else {
							next();
						}
					}
				}
			]
		},
		{
			path: '/scoreboard',
			name: 'scoreboard',
			component: () => import('./views/Scoreboard.vue')
		},
		{
			path: '/gamerules',
			name: 'gameRules',
			component: () => import('./views/GameRules.vue')
		}
	]
});

router.beforeEach((to, from, next) => {
	// close mobile navbar menu
	EventBus.$emit('close-navbar-menu');

	// change body background color
	if (to.meta.bodyClass) {
		document.body.className = to.meta.bodyClass;
	}
	else {
		document.body.className = '';
	}

	// manage views which require login
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!LoginHelper.isLoggedIn()) {
			next({
				path: '/login'
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

router.afterEach(() => {
	// ???
	const ee = document.getElementById('easter-trigger');
	if (ee) {
		ee.style.top = `${Math.random() * (90 - 4) + 4}vh`;
		ee.style.left = `${Math.random() * (90 - 4) + 4}vw`;
	}
});
