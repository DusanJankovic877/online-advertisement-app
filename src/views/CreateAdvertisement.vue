<template>
  <div class="container edit-create" v-if="advertisementForm">
    <h1>{{heading}}</h1>
    <form @submit.prevent>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="advertisementForm.title">
            <div class="errors">
                <p v-for="error in authErrors.title " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" v-model="advertisementForm.description">
            <div class="errors">
                <p v-for="error in authErrors.description " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image url</label>
            <input type="text" class="form-control" id="image" v-model="advertisementForm.image_url">
            <img :src="advertisementForm.image_url" alt="" style="width: 100%;">
            <div class="errors">
                <p v-for="error in authErrors.image_url " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="text" class="form-control" id="price" v-model="advertisementForm.price">
            <div class="errors">
                <p v-for="error in authErrors.price " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" v-model="advertisementForm.city">
            <div class="errors">
                <p v-for="error in authErrors.city " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <div class="input-group " >
          
              <select class="form-select" id="inputGroupSelect01" v-model="advertisementForm.category">
              <option value="" selected>Choose category</option>
                <option  
                  v-for="category in categories" 
                  :value="category.id" 
                  :key="category.id"
                >
                  {{category.title}}
                </option>
                
              </select>
            </div>
            <div class="errors">
                <p v-for="error in authErrors.category " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="edit-create-buttons">
            <button class="btn btn-success" style="float:left;" @click="handleSubmit()">Submit</button>
            <button class="btn btn-danger" style="float:right;" @click="goBack()">Cancel</button>
          </div>
          
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '../store'
export default {
  data(){
    return {
      advertisementForm:{
        title: '',
        description: '',
        price: '',
        city: '',
        category: '',
        userId: ''
      },

      defaultOption: 'Choose...',
      heading: 'Create Advertisement'
    }
  },
  computed:{
    ...mapGetters({
        loggedUser: 'authModule/loggedUser',
        authErrors: 'errorsModule/authErrors', 
        message: 'errorsModule/message', 
        categories: 'categoriesModule/categories',
    }),
  },
  methods:{
    ...mapActions({
      getCreateEditAdvertisement: 'advertisementsModule/getCreateEditAdvertisement'
    }),
    /**
     * if is create usend 
     * else use
     */
    async handleSubmit(){
      this.advertisementForm.userId = this.loggedUser.id
        await this.getCreateEditAdvertisement({advertisement: this.advertisementForm, heading: this.heading})
        if(this.message)this.$router.push({name: 'home'});
    },
    goBack(){
      this.$router.push({name: 'home'});
    }
  },
  async created(){
    store.dispatch('categoriesModule/getCategories');
  },
  beforeUnmount(){
    store.dispatch('errorsModule/deleteAuthErrors');
  }



}
</script>
<style>
.edit-create{
  padding-top: 150px;
}
form{
  background-color: lightgray;
  padding: 40px 100px !important;
}
input[type="text"] {
  background-color: #612b4e17 !important;

}
.edit-create > form > div {
  text-align: left;
}
.edit-create-buttons{
  width: 50%;
  margin: 0 auto;
  padding-bottom: 50px; 
}

</style>