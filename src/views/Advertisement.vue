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
            <p class="card-text"><b>Category: </b>{{advertisement.category}}</p>
            <p class="card-text"><b>Created: </b>{{formattedAdvertisementTime}}</p>
          </div>

          <div class="user">
            <p class="card-text"><b>User name: </b>{{loggedUser.name}}</p>
            <p class="card-text"><b>Telephone: </b>{{loggedUser.telephone}}</p>
            <p class="card-text"><b>Registered: </b>{{formattedUserTime}}</p>
          </div>
        </div>
        <div class="buttons">
          <router-link class="btn btn-warning edit-btn" :to="{name: 'create-edit-advertisement', params:{ id: advertisement.id}}">edit</router-link> 
          <button class="btn btn-danger delete-btn" @click="handleDeleteAdvertisement(advertisement.id)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex'
// import { Vue } from 'vue'
import store from '../store';
import moment from 'moment'
export default {
    computed:{
        ...mapGetters({
          advertisement: 'advertisementsModule/advertisement',
          loggedUser: 'authModule/loggedUser',
          message: 'errorsModule/message',
          currentPage: 'advertisementsModule/currentPage',
        }),
        formattedUserTime(){
          return moment().format('MMMM Do YYYY, h:mm:ss a', this.loggedUser.created_at);
        },
        formattedAdvertisementTime(){
          return moment().format('MMMM Do YYYY, h:mm:ss a', this.advertisement.created_at);
        }
    },
    methods:{
      ...mapActions({
        deleteAvertisement: 'advertisementsModule/deleteAvertisement'
      }),

      async handleDeleteAdvertisement(id){
        await this.deleteAvertisement({currentPage: this.currentPage, id: id})
        this.$router.push({name: 'home'})
      },
    },
    async created(){
        await store.dispatch('advertisementsModule/getAdvertisement', this.$route.params.id)
    },
    beforeUnmount() {
      store.dispatch('errorsModule/deleteMessage')
    },
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
  margin: 0 auto;
  width:50%;

}
.edit-btn{
  float: left;

}
.delete-btn{
  float: right;

}
</style>