import store from '@/store';
import { router } from '@/router';
import { EventBus } from '@/utils/EventBus.js';
// import Engine from '@/utils/Engine';

export default {
    isLoggedIn () {
        return store.getters['auth/isLoggedIn']();
    },
    login (username, password) {
        return store.dispatch('auth/login', {
            username: username,
            password: password
        }).then(() => {
            router.replace('/');
        });
    },
    logout () {
        return store.dispatch('auth/logout').then(() => {
			// Engine.countdown.terminate();
			EventBus.$emit('close-navbar-menu');
			EventBus.$emit('stop-polling-userwins');
			EventBus.$emit('stop-polling-game');
            router.replace('/');
        });
    }
};