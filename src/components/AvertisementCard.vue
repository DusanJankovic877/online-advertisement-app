<template>
    <div class="col-lg-10 m-auto cards">
      <div class="message-success">
        <p><b>{{message}}</b></p>
      </div>
      <div class="row">
        <div class="card col-lg-2" v-for="advertisement in advertisements" :key="advertisement.id">
          <img :src="advertisement.image_url" class="card-img-top" alt="picture">
          <div class="card-body">
            <h5></h5><h5 class="card-title">{{advertisement.title}}</h5>
            <p>Description</p><p class="card-text">{{advertisement.description}}</p>
            <p>Price</p><p class="card-text">{{advertisement.price}} &#8364;</p>
            <p>City</p><p class="card-text">{{advertisement.city}}</p>
            <p>Category</p><p  v-for="category in categories" :key="category.id" class="card-text">{{advertisement.category_id === category.id ? category.title : ''}}</p>
            <!--- ovde puca id-->
            <div v-if="isLogged && loggedUser.id === advertisement.user_id" class="buttons flex-buttons">
              <router-link class="btn btn-success" :to="{name: 'advertisement', params:{ id: advertisement.id}}">View</router-link> 
                    <button class="btn btn-danger" @click="handleDeleteAdvertisement(advertisement.id)">Delete</button>

            </div>
           <div v-else></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  /**
   * Passed properties from Parent
   */
props:{
  message: String,
  advertisements: Object,
  loggedUser: Object,
  isLogged: Boolean,
  categories: Object
}
}
</script>

<style>

</style>