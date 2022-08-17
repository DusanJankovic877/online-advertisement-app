<template>
  <div class="home">
    <pagination :currentPage="currentPage" :links="links" @handle-filters="handleFilters"/>
    <filters 
      :loggedUser="loggedUser" 
      :categories="categories" 
      :prices="prices"
      @handle-filters="handleFilters"
    />
    <AvertisementCard  :advertisements="advertisements" :loggedUser="loggedUser" :isLogged="isLogged" :message="message"/>
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