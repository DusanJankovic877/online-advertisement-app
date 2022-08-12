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
        <router-link class="btn btn-primary" :to="{name: 'login-signup', params:{option: 'login'}}">Login</router-link>
        <router-link class="btn btn-secondary" :to="{name: 'login-signup', params:{option: 'signup'}}">Sign up</router-link>
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
    ...mapGetters({loggedUser: 'authModule/loggedUser', isLogged: 'authModule/isLogged'})
  },
  methods:{
    ...mapActions({getLogout: 'authModule/getLogout'}),
    async handleLogout(){
      await this.getLogout();
      if(!this.isLogged && this.loggedUser === null)this.$router.push('/')
    }
  },
  created(){
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