<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
      </ul>
      <div v-if="loggedUser">
      {{loggedUser.name}}
      </div>
      <div v-else></div>
      <div class="logged" v-if="isLogged">
        <router-link class="btn btn-success add-ad" :to="{name: 'add-ad'}">Add new ad</router-link>  
        <button class="btn btn-danger sign-out " @click="handleLogout()">Sign out</button>  
      </div>
      <div class="signed-out" v-else>
        <router-link 
          class="btn btn-primary" 
          :to="{name: 'login-signup', params:{option: 'login'}}" 
          @click="handleAuthErrors('login')"
        >
          Login
        </router-link>
        <router-link 
          class="btn btn-secondary" 
          :to="{name: 'login-signup', 
          params:{option: 'signup'}}" 
          @click="handleAuthErrors('signup')"
        >
          Sign up
        </router-link>
      </div>

    </div>
  </div>
</nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '../../store';

export default {
  computed:{
    /**
     * Getting data from vuex store
     */
    ...mapGetters({
      loggedUser: 'authModule/loggedUser', 
      isLogged: 'authModule/isLogged', 
      authErrors: 'errorsModule/authErrors'})
  },
  methods:{
    /**
     * Getting actions from vuex store
     */
    ...mapActions({
      getLogout: 'authModule/getLogout', 
      deleteAuthErrors: 'errorsModule/deleteAuthErrors',
      deleteUnauthError: 'errorsModule/deleteUnauthError',  
    }),
    /**
     * Sending information to vuex store to logout user.
     * And routing to home page
     */
    async handleLogout(){
      await this.getLogout();
      if(!this.isLogged && this.loggedUser === null)this.$router.push('/')
    },
    /**
     * Deleting error messages from vuex for Authentication forms
     * based on String that method recives.
     * @param {String} val 
     */
    handleAuthErrors(val){
      if(this.authErrors){
        if(val !== 'login'){
          this.deleteAuthErrors()
          this.deleteUnauthError()
        }
        else{          
          this.deleteAuthErrors()
          this.deleteUnauthError()
        } 
      }
    }
  },
  created(){
    /**
     * When view is created user is requested from API 
     * based on token from localStorage.
     */
    store.dispatch('authModule/attempt', localStorage.getItem('token'))
  }
}
</script>

<style>
.add-ad{
  margin-left: 10px;
}
.sign-out{
  margin-left: 10px;
}
</style>