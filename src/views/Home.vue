<template>
  <div class="home">
    <pagination :currentPage="currentPage" :links="links" @handle-filters="handleFilters"/>
    <filters 
      :loggedUser="loggedUser" 
      :categories="categories" 
      :prices="prices"
      :selectedCategory="selectedCategory"
      @handle-filters="handleFilters"
    />
    <AvertisementCard  :advertisements="advertisements" :loggedUser="loggedUser" :categories="categories" :isLogged="isLogged" :message="message"/>
    <pagination :currentPage="currentPage" :links="links" @handle-filters="handleFilters"/>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '../store';
import AvertisementCard from '../components/AvertisementCard.vue';
import Pagination from '../components/Pagination.vue';
import Filters from '../components/Filters.vue';
export default {
    name: "Home",
    components:{
      AvertisementCard,
      Pagination,
      Filters
      
    },
    data(){
      return{
        searchByTitle: '',
        selectedCategory: '',
        prices: {
          min: {id: 0,title:'Min', value: 'ASC'},
          max: {id: 1,title:'Max', value: 'DESC'}
        },
        price: '',
        showUsersAdvertisements: false,

      }
    },

    computed: {
      ...mapGetters({
        loggedUser: 'authModule/loggedUser', 
        isLogged: 'authModule/isLogged', 
        currentPage: 'advertisementsModule/currentPage', 
        lastPage: 'advertisementsModule/lastPage',
        links: 'advertisementsModule/links',
        filterAdvertisements: 'advertisementsModule/filterAdvertisements',
        showUsersAdverts: 'advertisementsModule/showUsersAdverts',
        message: 'errorsModule/message',
        advertisements: 'advertisementsModule/advertisements',
        categories: 'categoriesModule/categories',

       
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
      /**
       * Handling filter parameters
       * I am cycling through the data Object params and params that are passed through method, 
       * and data from state getters
       * If some data becomes null or empty string because some other filter is activated,
       * I am getting data from state object where last input was saved and ading it 
       * Then i am saving data to contats and sending them to store method filterAdverts()
       * 
       * @param {Object} payload 
       * @param {Method} filterAdverts 
       */
      async handleFilters(payload){
        let nextPage = this.currentPage
        if(payload.nextPage && this.currentPage !== this.lastPage)nextPage = payload.nextPage + 1
        else if(payload.prevPage && this.currentPage !== 1)nextPage = payload.prevPage - 1
        if(payload.showPage)nextPage = payload.showPage

        const CATEGORY = payload.category
        this.selectedCategory = CATEGORY
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
      /**
       * I am sending id and current page to store method deleteAvertisement()
       * @param {Number} id 
       * @param {Number} currentPage 
       * @param {Method} deleteAvertisement 
       */
      async handleDeleteAdvertisement(id){
        await this.deleteAvertisement({currentPage: this.currentPage, id: id})
        this.$router.push({name: 'home'})
      },
    },
    /**
     * Before route is entered i am dispatching action getAdvertisements() in store
     * to get advertisements
     * @param {Object} to 
     * @param {Object} from 
     * @param {Method} next 
     */
    async beforeRouteEnter(to, from, next) {
        await store.dispatch("advertisementsModule/getAdvertisements", {nextPage: 1, category: ''});
        store.dispatch('categoriesModule/getCategories');
        next();
    },
    /**
     * Before view is un mounted I am dispatching action deleteMessage() to delete message
     */
    beforeUnmount() {
      store.dispatch('errorsModule/deleteMessage')
    },
}
</script>
<style >
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