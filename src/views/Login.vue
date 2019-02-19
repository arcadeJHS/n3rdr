<template>
    <section class="login">
            <div class="has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box has-coin-beast">
                        <figure class="avatar">
                            <!--<img width="128" height="128" class="is-rounded" src="@/assets/img/treasure.png">-->
                            <coin-beast font-size="1em"></coin-beast>
                        </figure>
                        <form @submit.prevent="login" v-if="showLogin">
                            <div class="field">
                                <div class="control">
                                    <input type="text" v-model="username" class="input is-large" name="username" placeholder="Username" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input type="password" v-model="password" class="input is-large" name="password" placeholder="Password">
                                </div>
                            </div>
                            <button type="submit" class="button is-block is-info is-large is-fullwidth" :disabled="!username || !password">Login</button>
                        </form>
						<form @submit.prevent="register" v-if="!showLogin">
							<span class="has-text-danger">{{registerMessage}}</span>
							<div class="field">
								<div class="control">
									<input type="email" v-model="email" class="input is-large" name="email" placeholder="email" autofocus="">
								</div>
							</div>
							<button type="submit" class="button is-block is-info is-large is-fullwidth" :disabled="!email">Register</button>
						</form>
                    </div>
					<p class="register has-text-white" @click="toggleRegister">
						{{showLogin ? 'Not registered yet?' : 'Return to login'}}
                    </p>
                </div>
            </div>
    </section>
</template>

<script>
import LoginHelper from "@/utils/LoginHelper.js";
import CoinBeast from '@/components/CoinBeast';

export default {
    name: "Login",
    components: {
        CoinBeast
    },
    data() {
        return {
            username: '',
			password: '',
			email: '',
			showLogin: true,
			registerMessage: ''
        };
    },
    methods: {
        login () {
            LoginHelper.login(this.username, this.password);
		},
		toggleRegister () {
			this.registerMessage = '';
			this.showLogin = !this.showLogin;
		},
		register () {
            this.$store.dispatch('auth/register', this.email).then((response) => {
				this.registerMessage = response;
			});
        }
    }
};
</script>

<style scoped lang="scss">
.login {
	margin-top: 15vh;
	.box {
		margin-bottom: 0;
	}
	.avatar {
		margin-top: -70px;
		padding-bottom: 1.5rem;
		img {
			padding: 5px;
			background: #fff;
			border-radius: 50%;
			box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
			width: 128px;
			height: 128px;
		}
	}
	input {
		font-weight: 300;
	}
	.register {
		cursor: pointer;
	}
}
</style>