<template>
  <div class="container edit-create" v-if="advertisementToUse">
    <h1>{{heading}}</h1>
    <form @submit.prevent>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="advertisementToUse.title">
            <div class="errors">
                <p v-for="error in authErrors.title " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" v-model="advertisementToUse.description">
            <div class="errors">
                <p v-for="error in authErrors.description " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image url</label>
            <input type="text" class="form-control" id="image" v-model="advertisementToUse.image_url">
            <img :src="advertisementToUse.image_url" alt="" style="width: 100%;">
            <div class="errors">
                <p v-for="error in authErrors.image_url " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="text" class="form-control" id="price" v-model="advertisementToUse.price">
            <div class="errors">
                <p v-for="error in authErrors.price " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" v-model="advertisementToUse.city">
            <div class="errors">
                <p v-for="error in authErrors.city " :key="error.id">{{error}}</p>
            </div>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
          <div class="input-group ">
            <select class="form-select" id="inputGroupSelect01" v-model="advertisementToUse.category">
              <option 
                :selected="advertisementToUse.category === category ? true : false" 
                :value="category" 
                v-for="category in categories" 
                :key="category.id"
              >
                {{category}}
              </option>
            </select>
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
        category: ''
      },
      categories: {
          default: 'Choose...',
          clothing: 'Clothing',
          tools: 'Tools',
          sports: 'Sports',
          accessories: 'Accessories',
          furniture: 'Furniture',
          pets: 'Pets',
          games: 'Games',
          books: 'Books'
      },
      roteParam: '',
      heading: this.$route.params.id ? 'Edit Advertisement' : 'Create Advertisement'
    }
  },
  computed:{
    ...mapGetters({
        advertisement: 'advertisementsModule/advertisement', 
        authErrors: 'errorsModule/authErrors', 
        loggedUser: 'authModule/loggedUser'

        }),
    advertisementToUse(){
      return this.$route.params.id ? this.advertisement : this.advertisementForm
    }
  },
  methods:{
    ...mapActions({
      getCreateEditAdvertisement: 'advertisementsModule/getCreateEditAdvertisement'
    }),

    async handleSubmit(){
      if(this.heading === 'Create Advertisement'){
        this.advertisementToUse.user_id = this.loggedUser.id; 
        await this.getCreateEditAdvertisement({advertisement: this.advertisementToUse, heading: this.heading})
        this.$router.push({name: 'home'});
      }else if(this.heading === 'Edit Advertisement'){
        console.log(this.advertisementToUse);
        await this.getCreateEditAdvertisement({advertisement: this.advertisementToUse, heading: this.heading})
        this.$router.push({name: 'advertisement', params: { id: this.advertisement.id}})
      }
    },
    goBack(){
      if(this.advertisement)this.$router.push({name: 'advertisement', params: { id: this.advertisement.id}});
      else this.$router.push({name: 'home'});
    }
  },
  async created(){
    if(this.$route.params.id)await store.dispatch('advertisementsModule/getAdvertisement', this.$route.params.id);

  },
  async beforeUnmount(){
    // store.dispatch('errorsModule/deleteAuthErrors', this.$route.params.id);
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