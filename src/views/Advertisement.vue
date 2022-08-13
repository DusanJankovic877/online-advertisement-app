<template>
  <div class="card container">
  <!-- <img :src="advertisement.image_url" class="card-img-top" alt=""> -->
  <div class="card-body">
          <img :src="advertisement.image_url" class="card-img-top" alt="picture">
          <div class="card-body">
            <h5></h5><h5 class="card-title"><b>Title:</b> {{advertisement.title}}</h5>
            <p class="card-text"><b>Description:</b>{{advertisement.description}}</p>
            <p class="card-text"><b>Price:</b>{{advertisement.price}} &#8364;</p>
            <p class="card-text"><b>City:</b>{{advertisement.city}}</p>
            <p class="card-text"><b>Category:</b>{{advertisement.category}}</p>
            <!--- ovde puca id-->
            <div class="buttons">
              <router-link class="btn btn-warning" :to="{name: 'create-edit-advertisement', params:{ id: advertisement.id}}">edit</router-link> 
              <button class="btn btn-danger">delete</button>
            </div>

          </div>
  </div>
      

          
</div>
</template>

<script>
import {  mapGetters } from 'vuex'
import store from '../store';
export default {
    computed:{
        ...mapGetters({advertisement: 'advertisementsModule/advertisement'})
    },
    methods:{

    },
    async beforeCreate(){
        console.log(this.$route.params.id);
        await store.dispatch('advertisementsModule/getAdvertisement', this.$route.params.id)
    }
}
</script>

<style>

</style>