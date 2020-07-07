<template>
  <div class="page">
    <form novalidate class="form md-layout" @submit.prevent="validateUser">
      <md-card class="container md-layout-item md-size-50 md-small-size-100">
      <md-progress-bar v-if="loging" md-mode="indeterminate"></md-progress-bar>
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>

          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
            <md-input type="username" name="username" id="username" autocomplete="username" v-model="form.username" :disabled="loging" />
            <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
          </md-field>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="form.password" :disabled="loging" />
                <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-button type="submit" class="md-primary" :disabled="loging">Login</md-button>
        <br/>
        <br/>
        <router-link to="/register">Don't have an account? Register here</router-link>
        <br/>
        <br/>

      </md-card>
    </form>
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
    data: () => ({
      form: {
        username: null,
        password: null,
      },
      loging: false,
    }),
    validations: {
      form: {
        username: {
          required,
        },
        password: {
          required,
        },
      }
    },
    created(){
      this.checkLogin();
    },
    methods: {
      checkLogin(){
        if(localStorage.getItem('kamu_access_token')){
          if(localStorage.getItem('kamu_username')){
            if(localStorage.getItem('kamu_email')){
              if(localStorage.getItem('kamu_color')){
                console.log('wee')
                this.$store.commit('SET_ISLOGGEDIN', true);
                this.$store.commit('SET_ACCESS_TOKEN', localStorage.getItem('kamu_access_token'));
                this.$store.commit('SET_USERNAME', localStorage.getItem('kamu_username'));
                this.$store.commit('SET_EMAIL', localStorage.getItem('kamu_email'));
                this.$store.commit('SET_COLOR', localStorage.getItem('kamu_color'));
                this.$router.push('/success');
              }      
            }
          }
        }
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.username = null
        this.form.password = null
      },
      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.login();
        }
      },
      login(){
        this.loging = true;
        this.$store.dispatch("login", this.form)
        .then(result=>{
            if(result){
              this.$router.push('/success');
              this.clearForm()
            }
            this.loging = false;
        })
        .catch(err=>{
            this.loging = false;
            console.log(err);
        })
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
  .form{
    position: relative;
    top: 10%;
  }
  .container{
    margin: 0 auto;
  }
  .page{
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(156,89,247,1) 0%, rgba(252,176,69,1) 100%);
    height: 100vh;
    width: 100vw;
  }

</style>
