<template>
<div class="nav-bot-margin">
  <Navbar/>
</div>
  <router-view/>
</template>
<script>
import Navbar from '@/components/layouts/Navbar'
export default {
  components: {
    Navbar
  },
  data() {
    return{}
  },

}
</script>>

<style>
.nav-bot-margin{
  margin-bottom: 100px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input, button, a{
  border-radius: 0 !important;
}
</style>
