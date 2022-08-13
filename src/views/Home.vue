<template>
  <div class="home">
 
    <div class="pagination">

      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">Prev</button>
      <div class="links">
        <span 
          v-for="link in links" 
          :key="link.id" 
          >
          <a :class="link.active ? 'active' : '' " href="#" @click="handleSelectPage({nextPage: link.label, price: $route.params.price})">{{link.label}}</a></span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handlePaginationNext(currentPage)">Next</button>
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
        <div class="check-box-div">
          <p>Show users articles</p>
        </div>
      </div>

      <div class="price-sort">
        <div class="dropdown col-lg-1">
          <button class="btn category-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="category in categories" :key="category.id" @click="handleCategorySearch(category)"><p>{{category}}</p></li>
          </ul>
        </div>

        <div class="col-lg-2">
          <div class="input-group title-input">
            <input type="text" class="form-control" v-model="searchByTitle" @input="handleSearchByTitle()" placeholder="Title" aria-label="title">
          </div>
          </div>

        <div class="price-sort">
            <div class="input-group radio-input-div min-radio-input" v-for="price in prices" :key="price.id">
              <div class="input-group-text">
                <input :id="'radio-input-'+price.id" class="form-check-input radio-input" @input="handleSearchByPrice(price.title)" name="price-sort" type="radio" :value="price.title" aria-label="Checkbox for following text input">
              </div>
              <label :for="'radio-input-'+price.id" type="text" class="form-control radio-label" aria-label="Text  with radio button">{{price.title}}</label>
            </div>

            <div class="input-group check-box-div">
              <div class="input-group-text ">
                <input       
                  @input="handleGetUsersAdvertisements()"
                  class="form-check-input" 
                  id="user-checkbox" 
                  type="checkbox" 
                  v-model="showUsersAdvertisements" 
                  aria-label="Radio button for following text input"
                >
              </div>
                <label for="user-checkbox" type="text" class="form-control radio-label" aria-label="Text  with radio button">Show mine only</label>
                <div v-if="!isLogged && showUsersAdvertisements" class="errors" style="width: 182px; height:25px;">
                  <p>{{this.error}}</p>
                </div>
                <div v-else></div>
            </div>
        </div>

      </div><!--  end of row-->
    </div><!--  end of filters container -->
   
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
      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">Prev</button>
      <div class="links">
        <span 
          v-for="link in links" 
          :key="link.id" 
          >
          <a :class="link.active ? 'active' : '' " href="#" @click="handleSelectPage({nextPage: link.label, price: $route.params.price})">{{link.label}}</a></span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handlePaginationNext(currentPage)">Next</button>
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
        searchByTitle: '',
        prices: {
          min: {id: 0,title:'Min'},
          max: {id: 1,title:'Max'}
        },
        price: '',
        showUsersAdvertisements: false,
        error: ''
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
        links: 'advertisementsModule/links'
      })
    },
    methods: {
      ...mapActions({
        getAdvertisements: 'advertisementsModule/getAdvertisements', 
        getAdvertisementsByUserName: 'advertisementsModule/getAdvertisementsByUserName',
        getUsersAdvertisements: 'usersModule/getUsersAdvertisements',
        deleteUsersAdvertisements: 'usersModule/deleteUsersAdvertisements'
      }),
      handlePaginationNext(currentPage){
        if(currentPage !== this.lastPage){
          var nextPage = currentPage + 1
          this.getAdvertisements({nextPage: nextPage, searchByPrice: this.$route.params.price})
        }
      },
      handlePaginationPrev(currentPage){
        if(currentPage !== 1){
          var prevPage = currentPage - 1
          this.getAdvertisements({nextPage: prevPage})
        }
      },
      handleSelectPage(payload){
          this.price = payload.price ? payload.price : this.price
          this.getAdvertisements({nextPage: payload.nextPage, searchByPrice: this.price})
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
      },
      handleSearchByPrice(price){
        this.$route.params.price = price
        this.getAdvertisements({nextPage: this.currentPage, searchByPrice: price})
      },
      async handleGetUsersAdvertisements(){

        // console.log('this.loggedUser, this.currentPage', this.loggedUser.id);
        if(this.isLogged)await this.getUsersAdvertisements({nextPage: this.currentPage, usersAdvertisements: this.loggedUser.id, showUsersAdvertisements: !this.showUsersAdvertisements})
        else if(!this.isLogged && !this.showUsersAdvertisements)this.error = 'you are not logged in'
        else if(!this.isLogged && this.showUsersAdvertisements)this.error = ''

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
</style>