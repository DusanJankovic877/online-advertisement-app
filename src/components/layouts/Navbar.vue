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
      <form class="d-flex">

        <router-link class="btn btn-primary" :to="{name: 'login-signup', params:{option: 'login'}}">Login</router-link>
        <router-link class="btn btn-secondary" :to="{name: 'login-signup', params:{option: 'signup'}}">Sign up</router-link>
      </form>
    </div>
  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>