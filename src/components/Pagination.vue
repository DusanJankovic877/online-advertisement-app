<template>
    <div class="pagination">
      <button class="btn btn-secondary paginate-prev" @click="$emit(handleFilters({prevPage: currentPage}))">Prev</button>
      <div class="links">
        <span 
          v-for="link in links" 
          :key="link.id" 
          >
          <a :class="link.active ? 'active' : '' " href="#" @click="$emit(handleFilters({showPage: link.label}))">{{link.label}}</a></span>
      </div>
      <button class="btn btn-secondary paginate-next" @click="$emit(handleFilters({nextPage: currentPage}))">Next</button>
    </div>
</template>
<!-- <script setup>
const props = defineProps({
  links: Object,
  currentPage: Number
})
</script> -->
<script>
export default {

  // emits:['handle-filters'],
  props: {
    links: Object,
    currentPage: Number
  },
  methods: {
    handleFilters(payload){

      this.$emit('handle-filters', payload)
    }
  }
}
</script>

<style scoped>
.links > span > a{
  color: #2C3E50;
  text-decoration: none;
}
.active{
  color: red !important;
}
</style>