<template>
   <div class="container edit-create" v-if="advertisement">
    <h1>{{heading}}</h1>
    <form @submit.prevent>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="advertisement.title">
            <div class="errors">
                <p v-for="error in authErrors.title " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" v-model="advertisement.description">
            <div class="errors">
                <p v-for="error in authErrors.description " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image url</label>
            <input type="text" class="form-control" id="image" v-model="advertisement.image_url">
            <img :src="advertisement.image_url" alt="" style="width: 100%;">
            <div class="errors">
                <p v-for="error in authErrors.image_url " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="text" class="form-control" id="price" v-model="advertisement.price">
            <div class="errors">
                <p v-for="error in authErrors.price " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" v-model="advertisement.city">
            <div class="errors">
                <p v-for="error in authErrors.city " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <div class="input-group " >
          
              <select class="form-select" id="inputGroupSelect01" v-model="advertisement.category_id">
                <option  
                    v-for="category in categories" 
                    :selected="advertisement.category.title"
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
            heading: 'Edit Advertisement'
        }
    },
    computed: {
    ...mapGetters({
        advertisement: 'advertisementsModule/advertisement', 
        authErrors: 'errorsModule/authErrors', 
        message: 'errorsModule/message', 
        loggedUser: 'authModule/loggedUser',
        categories: 'categoriesModule/categories',
    }),
    },
    methods:{
    ...mapActions({
      getCreateEditAdvertisement: 'advertisementsModule/getCreateEditAdvertisement'
    }),
    async handleSubmit(){
        await this.getCreateEditAdvertisement({advertisement: this.advertisement, heading: this.heading})
        if(this.message)this.$router.push({name: 'advertisement', params: { id: this.advertisement.id}});
    },
    goBack(){
      this.$router.push({name: 'advertisement', params: { id: this.advertisement.id}});

    }
    },
    async created(){
    if(this.$route.params.id)await store.dispatch('advertisementsModule/getAdvertisement', this.$route.params.id);
        store.dispatch('categoriesModule/getCategories');
    },
    beforeUnmount(){
        store.dispatch('errorsModule/deleteAuthErrors');
    }
}
</script>

<style>

</style>