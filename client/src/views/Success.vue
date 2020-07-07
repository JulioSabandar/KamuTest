<template>
    <div v-if="color === 'blue'" class="bluepage">
        <div novalidate class="container md-layout" @submit.prevent="validateUser">
        <md-card class="container md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Success</div>
                <br/>
                <br/>

                <div class="md-subtitle">Your Email is {{email}}</div>
                <br/>

                <div class="md-subtitle">Your preferred color is {{color}}</div>
                <br/>

            </md-card-header>
            <md-button v-on:click="logout" class="md-accent">Logout</md-button>
        </md-card>
        </div>
    </div>
  
    <div v-else-if="color === 'red'" class="redpage">
        <div novalidate class="container md-layout" @submit.prevent="validateUser">
        <md-card class="container md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Success</div>
                <br/>
                <br/>

                <div class="md-subtitle">Your email is {{email}}</div>
                <br/>

                <div class="md-subtitle">Your preferred color is {{color}}</div>
                <br/>

            </md-card-header>
            <md-button v-on:click="logout" class="md-accent">Logout</md-button>
        </md-card>
        </div>
    </div>

    <div v-else-if="color === 'green'" class="greenpage">
        <div novalidate class="container md-layout" @submit.prevent="validateUser">
        <md-card class="container md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Success</div>
                <br/>
                <br/>
                <div class="md-subtitle">Your email is {{email}}</div>
                <br/>
                <div class="md-subtitle">Your preferred color is {{color}}</div>
                <br/>
            </md-card-header>
            <md-button  v-on:click="logout" class="md-accent">Logout</md-button>
        </md-card>
        
        </div>
    </div>


</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    mixins: [validationMixin],
    computed: {
        email(){
            return this.$store.state.email;
        },
        isLoggedIn(){
            return this.$store.state.isLoggedIn;
        },
        color(){
            return this.$store.state.color;
        }
    },
    created(){
        this.checkLogin();
        this.welcome();
    },
    methods: {
        checkLogin: function(){
            if(localStorage.getItem('kamu_access_token') 
            && localStorage.getItem('kamu_username')
            && localStorage.getItem('kamu_email')
            && localStorage.getItem('kamu_color')) {
                this.$store.commit('SET_ISLOGGEDIN', true);
                this.$store.commit('SET_ACCESS_TOKEN', localStorage.getItem('kamu_access_token'));
                this.$store.commit('SET_USERNAME', localStorage.getItem('kamu_username'));
                this.$store.commit('SET_EMAIL', localStorage.getItem('kamu_email'));
                this.$store.commit('SET_COLOR', localStorage.getItem('kamu_color'));
            }else{
                this.$router.push('/');
            }
        },
        welcome: function(){
            Vue.toasted.show('Welcome', { 
                theme: "toasted-primary", 
                position: "top-center", 
                duration : 5000
            });
        },
        logout: function(){
            localStorage.clear();
            this.$store.commit('SET_ISLOGGEDIN', false);
            this.$store.commit('SET_USERNAME', null);
            this.$store.commit('SET_EMAIL', null);
            this.$store.commit('SET_COLOR', null);
            this.$store.commit('SET_ACCESS_TOKEN', null);
            this.$router.push('/');
        }
    }
  }
</script>

<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    .container{
        margin: 0 auto;
        position: relative;
        top: 10%;
    }
    .bluepage{
        background: radial-gradient(circle, rgba(202,250,255,1) 0%, rgba(74,157,255,1) 100%);
        height: 100vh;
        width: 100vw;
    }
    .greenpage{
        background: radial-gradient(circle, rgba(220,255,199,1) 0%, rgba(3,196,79,1) 100%);
        height: 100vh;
        width: 100vw;
    }
    .redpage{
        background: radial-gradient(circle, rgba(255,199,199,1) 0%, rgba(255,0,0,1) 100%);
        height: 100vh;
        width: 100vw;
    }



</style>
