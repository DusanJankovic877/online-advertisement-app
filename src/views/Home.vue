<template>
  <div class="home">
 
    <div class="pagination">
      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">prev</button>
      <div class="links">
        <span v-for="link in links" :key="link.id" :class="link.active ? 'active' : '' ">{{link.label}}</span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handlePaginationNext(currentPage)">next</button>
    </div>
   

      
    <div class="filters container">
      <div class="row">

        <div class="dropdown col-lg-1">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="category in categories" :key="category.id" @click="handleCategorySearch(category)"><p>{{category}}</p></li>
          </ul>
        </div>
  <div class="col-lg-2"><input type="text" v-model="searchByTitle" @input="handleSearchByTitle()"></div>
  <div class="col-lg-1">po ceni min-max</div>
  <div class="col-lg-1">checkbox show mine only</div>
      </div>
    </div>
   
    <div class="col-lg-10 m-auto cards">
      <div class="row">
        <div class="card col-lg-2" v-for="advertisement in advertisements" :key="advertisement.id">
          <img :src="advertisement.image_url" class="card-img-top" alt="picture">
          <div class="card-body">
            <h5>Title</h5><h5 class="card-title">{{advertisement.title}}</h5>
            <p>Description</p><p class="card-text">{{advertisement.description}}</p>
            <p>Price</p><p class="card-text">{{advertisement.price}} &#8364;</p>
            <p>City</p><p class="card-text">{{advertisement.city}}</p>
            <p>Category</p><p class="card-text">{{advertisement.category}}</p>
            <!--- ovde puca id-->
            <!-- <div v-if="loggedUser.id === advertisement.user_id" class="buttons"> 
              <button class="btn btn-warning">edit</button>
              <button class="btn btn-danger">delete</button>
            </div>
            <div v-else></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">prev</button>
      <div class="links">
        <span v-for="link in links" :key="link.id" :class="link.active ? 'active' : '' ">{{link.label}}</span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handlePaginationNext(currentPage)">next</button>
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
          clothing: 'clothing',
          tools: 'tools',
          sports: 'sports',
          accessories: 'accessories',
          furniture: 'furniture',
          pets: 'pets',
          games: 'games',
          books: 'books',
          dolor: 'eveniet',
          none: 'none'
        },
        searchByTitle: ''
      }
    },

    computed: {
      advertisements(){
        return this.$store.state.advertisementsModule.advertisements
      },
      ...mapGetters({
        loggedUser: 'authModule/loggedUser', 
        currentPage: 'advertisementsModule/currentPage', 
        lastPage: 'advertisementsModule/lastPage',
        links: 'advertisementsModule/links'
      })
    },
    methods: {
      ...mapActions({
        getAdvertisements: 'advertisementsModule/getAdvertisements', 
        getAdvertisementsByUserName: 'advertisementsModule/getAdvertisementsByUserName'
      }),
      handlePaginationNext(currentPage){
        if(currentPage !== this.lastPage){
          var nextPage = currentPage + 1
          this.getAdvertisements({nextPage: nextPage})
        }
      },
      handlePaginationPrev(currentPage){
        if(currentPage !== 1){
          var prevPage = currentPage - 1
          this.getAdvertisements({nextPage: prevPage})
        }
      },
      handleCategorySearch(category){
        this.getAdvertisements({nextPage: this.currentPage, category: category === 'none' ? '' : category})
      },
      handleSearchByTitle(){
        if(this.searchByTitle === ''){
          this.getAdvertisements({nextPage: this.currentPage})
        }else{
          this.getAdvertisements({nextPage: this.currentPage, searchByTitle: this.searchByTitle})
        }
      }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch("advertisementsModule/getAdvertisements", {nextPage: 1, category: ''});
        next();
    }
}
</script>
<style scoped>
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
.active{
  color: red;
}
.search-advertisements{
  position: absolute;
}
.filters{
  padding-top: 40px;
}

.dropdown-menu > li > p{
  padding-left: 15px;
}
.dropdown-menu > li > p:hover{
  cursor: pointer;
}
</style>