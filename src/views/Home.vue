<template>
  <div class="home">
    <div class="pagination">
      <button class="btn btn-secondary paginate-prev" @click="handlePaginationPrev(currentPage)">prev</button>
      <div class="links">
        <span v-for="link in links" :key="link.id" :class="link.active ? 'active' : '' ">{{link.label}}</span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="handlePaginationNext(currentPage)">next</button>
    </div>
    <div class="col-lg-10 m-auto cards">
      <div class="row">
        <div class="card col-lg-2" v-for="advertisement in advertisements" :key="advertisement.id">
          <img :src="advertisement.image_url" class="card-img-top" alt="picture">
          <div class="card-body">
            <h5 class="card-title">{{advertisement.title}}</h5>
            <p class="card-text">{{advertisement.description}}</p>
            <p class="card-text">{{advertisement.price}}</p>
            <p class="card-text">{{advertisement.city}}</p>
            <p class="card-text">{{advertisement.category}}</p>
            <div v-if="loggedUser.id === advertisement.user_id" class="buttons">
              <button class="btn btn-warning">edit</button>
              <button class="btn btn-danger">ddelete</button>
            </div>
            <div v-else></div>
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
      ...mapActions({getAdvertisements: 'advertisementsModule/getAdvertisements'}),
      handlePaginationNext(currentPage){
        if(currentPage !== this.lastPage){
          var nextPage = currentPage + 1
          this.getAdvertisements(nextPage)
        }

      },
      handlePaginationPrev(currentPage){
        if(currentPage !== 1){
          var prevPage = currentPage - 1
          this.getAdvertisements(prevPage)
        }

      }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch("advertisementsModule/getAdvertisements", 1);
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
span{
  padding: 5px;
}
.active{
  color: red;
}
</style>