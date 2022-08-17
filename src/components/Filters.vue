<template>
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
</template>

<script>
export default {
    data(){
        return{
            searchByTitle: '',
            showUsersAdvertisements: false
        }
    },
    /**
   * Passed properties from Parent
   */
  props: {
    loggedUser:Object, 
    categories: Object,
    prices: Object
  },
  methods: {
    /**
   * Passed properties from Parent
   */
    handleFilters(payload){
      this.$emit('handle-filters', payload)
    }
  }
}
</script>

<style>

</style>