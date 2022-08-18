<template>
  <div class="single-advertisement container" v-if="advertisement">
        <div class="message-success">
          <p><b>{{message}}</b></p>
        </div>
    <div class="card container advertisement-container-card">
      <div class="card-body">
        <img :src="advertisement.image_url" class="card-img-top" alt="picture">
        <div class="card-body advertisement-body">
          <div class="adevertisement">
            <h5></h5><h5 class="card-title"><b>Title: </b> {{advertisement.title}}</h5>
            <p class="card-text"><b>Description: </b>{{advertisement.description}}</p>
            <p class="card-text"><b>Price: </b>{{advertisement.price}} &#8364;</p>
            <p class="card-text"><b>City: </b>{{advertisement.city}}</p>
            <p class="card-text"><b>Category: </b>{{advertisement.category.title}}</p>
            <p class="card-text"><b>Created: </b>{{formattedAdvertisementTime}}</p>
          </div>

          <div class="user">
            <p class="card-text"><b>User name: </b>{{loggedUser.name}}</p>
            <p class="card-text"><b>Telephone: </b>{{loggedUser.telephone}}</p>
            <p class="card-text"><b>Registered: </b>{{formattedUserTime}}</p>
          </div>
        </div>
        <div class="buttons">
          <router-link class="btn btn-success edit-btn" :to="{name: 'edit-advertisement', params:{ id: advertisement.id}}">edit</router-link> 
          <button class="btn btn-danger delete-btn" @click="handleDeleteAdvertisement({id: advertisement.id})">delete</button>
          <router-link class="btn btn-warning go-back-btn" :to="{name: 'home'}">Go Back</router-link> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex'
import { formatTime } from '../helpers/index'
// import { Vue } from 'vue'
import store from '../store';
export default {
    computed:{
        ...mapGetters({
          advertisement: 'advertisementsModule/advertisement',
          loggedUser: 'authModule/loggedUser',
          message: 'errorsModule/message',
          currentPage: 'advertisementsModule/currentPage',
        }),

        formattedUserTime(){
          return formatTime(this.loggedUser.created_at)
        },
        formattedAdvertisementTime(){
          return formatTime(this.advertisement.created_at);
        }
    },
    methods:{
      ...mapActions({
        deleteAvertisement: 'advertisementsModule/deleteAvertisement'
      }),

      async handleDeleteAdvertisement(id){
        console.log('id', id);
        await this.deleteAvertisement({currentPage: this.currentPage, id: id})
        this.$router.push({name: 'home'})
      },
    },
    async created(){
      await store.dispatch('advertisementsModule/getAdvertisement', this.$route.params.id)
    }
}
</script>

<style>
.single-advertisement{
  padding-top: 100px;
}
.advertisement-container-card{
  background-color: gray;
  margin-bottom: 50px;
}
.advertisement-body{
  display: flex;
  background-color: antiquewhite;
}
.adevertisement {
  text-align: left !important;
  width:50%;
}
.user {
  text-align: right !important;
  width:50%;
}
.buttons{
  display: flex;
  margin: 0 auto;
  width:50%;

}
.edit-btn{
  /* float: left; */
  margin: 0 auto !important;
}
.delete-btn{
  margin: 0 auto !important;
  }
.go-back-btn{
  margin: 0 auto !important;

}
</style>