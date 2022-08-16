<template>
  <div class="home">
    <div class="pagination">
      
      <button class="btn btn-secondary paginate-prev" @click="handleFilters({prevPage: currentPage})">Prev</button>
      <div class="links">
        <span 
          v-for="link in links" 
          :key="link.id" 
          >
          <a :class="link.active ? 'active' : '' " href="#" @click="handleFilters({showPage: link.label})">{{link.label}}</a></span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handleFilters({nextPage: currentPage})">Next</button>
    </div>
  
   
    <div class="filters container">
      <div class="price-sort">
        <div class="dropdown category-label">
          <p>Sort by category</p>
        </div>
        <div class="col-lg-2 title-label">
          <p>Sort by title</p>
        </div>
        <div class="price-label" >
          <p>Sort by price</p>
        </div>
        <div class="check-box-div" v-if="loggedUser">
          <p>Show users articles</p>
        </div>
      </div>

      <div class="price-sort">
        <div class="dropdown col-lg-1">
          <button class="btn category-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="category in categories" :key="category.id" @click="handleFilters({category: category})"><p>{{category}}</p></li>
          </ul>
        </div>

        <div class="col-lg-2">
          <div class="input-group title-input">
            <input type="text" class="form-control" v-model="searchByTitle" @input="handleFilters({title: searchByTitle})" placeholder="Title" aria-label="title">
          </div>
          </div>

        <div class="price-sort">
            <div class="input-group radio-input-div min-radio-input" v-for="price in prices" :key="price.id">
              <div class="input-group-text">
                <input :id="'radio-input-'+price.id" class="form-check-input radio-input" @input="handleFilters({priceOrder: price.value})" name="price-sort" type="radio" :value="price.title" aria-label="Checkbox for following text input">
              </div>
              <label :for="'radio-input-'+price.id" type="text" class="form-control radio-label" aria-label="Text  with radio button">{{price.title}}</label>
            </div>

            <div class="input-group check-box-div" v-if="loggedUser">
              <div class="input-group-text ">
                <input       
                  @input="handleFilters({showUsersAdvertisements: !showUsersAdvertisements})"
                  class="form-check-input" 
                  id="user-checkbox" 
                  type="checkbox" 
                  v-model="showUsersAdvertisements" 
                  aria-label="Radio button for following text input"
                >
              </div>
                <label for="user-checkbox" type="text" class="form-control radio-label" aria-label="Text  with radio button">Show mine only</label>
            </div>
        </div>

      </div><!--  end of row-->
    </div><!--  end of filters container -->
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
            <p>Category</p><p class="card-text">{{advertisement.category}}</p>
            <!--- ovde puca id-->
            <div v-if="isLogged && loggedUser.id === advertisement.user_id" class="buttons flex-buttons">
              <router-link class="btn btn-warning" :to="{name: 'advertisement', params:{ id: advertisement.id}}">View</router-link> 
                    <button class="btn btn-secondary" @click="handleDeleteAdvertisement(advertisement.id)">Delete</button>

            </div>
           <div v-else></div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">Prev</button>
      <div class="links">
        <span 
          v-for="link in links" 
          :key="link.id" 
          >
          <a :class="link.active ? 'active' : '' " href="#" @click="handleSelectPage({nextPage: link.label, price: $route.params.price})">{{link.label}}</a></span>
      </div>
    </div>

    <!-- <AvertisementCard  :advertisement="advertisement"/> -->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import { mapGetters } from 'vuex'
import store from '../store';
// import AvertisementCard from '../components/AvertisementCard.vue';
export default {
    name: "Home",
    components:{
      // AvertisementCard
    },
    data(){
      return{
        categories:{
          clothing: 'Clothing',
          tools: 'Tools',
          sports: 'Sports',
          accessories: 'Accessories',
          furniture: 'Furniture',
          pets: 'Pets',
          games: 'Games',
          books: 'Books',
          none: 'None'
        },
        searchByTitle: '',
        prices: {
          min: {id: 0,title:'Min', value: 'ASC'},
          max: {id: 1,title:'Max', value: 'DESC'}
        },
        price: '',
        showUsersAdvertisements: false,

      }
    },

    computed: {
      advertisements(){
        return this.$store.state.advertisementsModule.advertisements
      },
      ...mapGetters({
        loggedUser: 'authModule/loggedUser', 
        isLogged: 'authModule/isLogged', 
        currentPage: 'advertisementsModule/currentPage', 
        lastPage: 'advertisementsModule/lastPage',
        links: 'advertisementsModule/links',
        filterAdvertisements: 'advertisementsModule/filterAdvertisements',
        showUsersAdverts: 'advertisementsModule/showUsersAdverts',
        message: 'errorsModule/message'
       
      })
    },
    methods: {

      ...mapActions({
        getAdvertisements: 'advertisementsModule/getAdvertisements', 
        getAdvertisementsByUserName: 'advertisementsModule/getAdvertisementsByUserName',
        getUsersAdvertisements: 'usersModule/getUsersAdvertisements',
        deleteUsersAdvertisements: 'usersModule/deleteUsersAdvertisements',
        filterAdverts: 'advertisementsModule/filterAdverts',
        deleteAvertisement: 'advertisementsModule/deleteAvertisement'
      }),
      async handleFilters(payload){

        let nextPage = this.currentPage
        if(payload.nextPage && this.currentPage !== this.lastPage)nextPage = payload.nextPage + 1
        else if(payload.prevPage && this.currentPage !== 1)nextPage = payload.prevPage - 1
        if(payload.showPage)nextPage = payload.showPage

        const CATEGORY = payload.category
        const TITLE = payload.title !== '' ? payload.title : null
        const PRICE_ORDER = payload.priceOrder

        let listUserAdvertisements = payload.showUsersAdvertisements // this is for false boolean
        if(payload.showUsersAdvertisements)listUserAdvertisements = payload.showUsersAdvertisements
        else if(payload.showUsersAdvertisements === undefined)listUserAdvertisements = this.showUsersAdverts
        const USER_ID = this.loggedUser && listUserAdvertisements ? this.loggedUser.id : null

        await this.filterAdverts({
          category: CATEGORY, 
          title: TITLE, 
          priceOrder: PRICE_ORDER, 
          userId: USER_ID, 
          showUsersAdvertisements: listUserAdvertisements,
          page: nextPage
        })

      },
    async handleDeleteAdvertisement(id){
      await this.deleteAvertisement({currentPage: this.currentPage, id: id})
      this.$router.push({name: 'home'})
    },
    },

    async beforeRouteEnter(to, from, next) {
        await store.dispatch("advertisementsModule/getAdvertisements", {nextPage: 1, category: ''});
        next();
    },
    beforeUnmount() {
      store.dispatch('errorsModule/deleteMessage')
    },
}
</script>
<style scoped>
.home{
  padding-top: 100px;
}
.card{
  margin: 1.66%;
}
.cards{
  padding: 50px 0;
}
.pagination{
  position:absolute;
  left:50%;
  transform: translate(-50%,-50%); 
}
.paginate-prev{
  margin-right: 10px;
}
.paginate-next{
  margin-left: 10px;
}
.links{
  margin-top: 6px;
}
span{
  padding: 5px;
}
.links > span > a{
  color: #2C3E50;
  text-decoration: none;

}
.active{
  color: red !important;
}
.search-advertisements{
  position: absolute;
}
.filters{
  padding-top: 40px;
}
.category-label{
  margin-left: -4px;
  width: 117px;
  height: 25px;

}
.title-label{
   margin-left: 4px;
}
.price-label{
  width: 200px; 
  margin-left: 15px;
}

.category-button{
  border-color: #CED4DA;
  background-color: #E9ECEF;
}
.dropdown-menu > li > p{
  padding-left: 15px;
}
.dropdown-menu > li > p:hover{
  cursor: pointer;
}
.title-input{
  margin-left: 10px;
}
  .price-sort, .filters-labels{
    display: flex;
  }
  .price-sort > div > p{
    margin-bottom: 0;
  }
  .min-radio-input:first-child{
    margin-left: 20px;
  }
    .min-radio-input:nth-child(2){
    margin-left: 10px;
  }
  .radio-input-div{
    width: 100px !important;
  }
  .input-group-text{

    height:38px;
    width:38px;
    border-radius: 0 !important;
    
  }
.radio-input{
  height:13px;
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 5em !important;


}
.radio-label{
  height:38px;
  padding-top: 8px;
  border-radius: 0 !important;
  
}
.check-box-div{
  width: 180px;
  margin-left: 10px;
  
}
.check-box-div > div > input {
  height:13px;
  margin: 0 !important;
  padding: 0 !important;

}
.flex-buttons{
  display: flex;
}

</style>