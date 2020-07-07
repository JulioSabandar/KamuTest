<template>
  <div class="page">
    <form novalidate class="form md-layout" @submit.prevent="validateUser">
      <md-card class="container md-layout-item md-size-50 md-small-size-100">
        <md-progress-bar v-if="loging" md-mode="indeterminate"></md-progress-bar>
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>
        <md-card-content class="cardContent">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstname')">
                <label for="firstname">First Name</label>
                <md-input name="firstname" id="firstname" autocomplete="firstname" v-model="form.firstname" :disabled="loging" />
                <span class="md-error" v-if="!$v.form.firstname.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstname.minlength">Invalid first name</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastname')">
                <label for="lastname">Last Name</label>
                <md-input name="lastname" id="lastname" autocomplete="lastname" v-model="form.lastname" :disabled="loging" />
                <span class="md-error" v-if="!$v.form.lastname.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastname.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>
          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
            <md-input type="username" name="username" id="username" autocomplete="username" v-model="form.username" :disabled="loging" />
            <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
            <span class="md-error" v-else-if="!$v.form.username.minlength">Username must be atleast 6 characters</span>
          </md-field>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="loging" />
            <span class="md-error" v-if="!$v.form.email.required">Your email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('phone')">
            <label for="email">Phone Number</label>
            <md-input type="number" name="phone" id="phone" autocomplete="phone" v-model="form.phone" :disabled="loging" />
            <span class="md-error" v-if="!$v.form.phone.required">Your phone number is required</span>
            <span class="md-error" v-else-if="!$v.form.phone.required">Invalid phone number</span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="form.password" :disabled="loging" />
                <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Password must be atleast 6 characters</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('confirmpassword')">
                <label for="confirmpassword">Confirm Password</label>
                <md-input type="password" name="confirmpassword" id="confirmpassword" autocomplete="confirmpassword" v-model="form.confirmpassword" :disabled="loging" />
                <span class="md-error" v-if="!$v.form.confirmpassword.required">Confirm password is required</span>
                <span class="md-error" v-else-if="!$v.form.confirmpassword.sameAsPassword">Confirm password not the same as password</span>
                <span class="md-error" v-else-if="!$v.form.confirmpassword.minlength">Confirm password must be atleast 6 characters</span>

              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('color')">
                <label for="color">Preferred Color</label>
                <md-select name="color" id="color" v-model="form.color" md-dense :disabled="loging">
                  <md-option value="blue">Blue</md-option>
                  <md-option value="green">Green</md-option>
                  <md-option value="red">Red</md-option>
                </md-select>
                <span class="md-error">Your preferred color is required</span>
              </md-field>
            </div>
            <md-button type="submit" class="md-primary" :disabled="loging">Register</md-button>
            <br/>
            <router-link to="/">Already have an account? Login here</router-link>
            <br/>
        </md-card-content>
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
    name: 'Register',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstname: null,
        lastname: null,
        username: null,
        password: null,
        confirmpassword: null,
        email: null,
        phone: null,
        color: null,
      },
      userSaved: false,
      loging: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstname: {
          required,
          minLength: minLength(3)
        },
        lastname: {
          required,
          minLength: minLength(3)
        },
        username: {
          required,
          minLength: minLength(6)
        },
        password: {
          required,
          minLength: minLength(6),
        },
        confirmpassword: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password')
        },
        phone: {
          minLength: minLength(7),
          required
        },
        email: {
          required,
          email
        },
        color: {
          required
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
        this.form.firstname = null
        this.form.lastname = null
        this.form.username = null
        this.form.password = null
        this.form.confirmpassword = null
        this.form.email = null
        this.form.phone = null
        this.form.color = null
      },
      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.register();
        }
      },
      register(){
        this.loging = true;
        this.$store.dispatch("register", this.form)
        .then(result=>{
            if(result){
              this.$router.push('/');
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
    max-height: 80vh;
  }
  .cardContent{
    height: 85%;
    overflow: scroll
  }
  .page{
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(156,89,247,1) 0%, rgba(252,176,69,1) 100%);
    height: 100vh;
    width: 100vw;
}

</style>
