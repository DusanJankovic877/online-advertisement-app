<template>
  <div class="col-lg-7 m-auto">
    <form @submit.prevent>
        <div class="mb-3">
            <label for="userName" class="form-label">User name</label>
            <input type="text" class="form-control" id="userName" v-model="form.name">
            <div class="errors">
                <p v-for="error in authErrors.name " :key="error.id">{{error}}</p>
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="form.password">
            <div class="errors">
                <p v-for="error in authErrors.password " :key="error.id">{{error}}</p>
            </div>
        </div>
        <div class="mb-3" v-if="$route.params.option !== 'login'">
            <label for="telephone" class="form-label">Telephone</label>
            <input type="tel" class="form-control" id="telephone" v-model="form.telephone">
            <div class="errors">
                <p v-for="error in authErrors.telephone " :key="error.id">{{error}}</p>
            </div>
        </div>
        <div v-else></div>
        <div class="errors" v-if="unauthError">
            <p>{{unauthError}}</p>
        </div>
        <div v-else></div>
        <button 
            class="btn btn-success" 
            @click="handleSubmit($route.params.option === 'login' ? 'Login' : 'Register')"
        >
            {{$route.params.option === 'login' ? 'Login' : 'Register'}}
        </button>
    </form>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
    data(){
        return {
            form: {
                name: '',
                password: '',
                telephone: '',
            }
        }
    },
    computed:{
        /**
         * Getting data from vuex store
         */
        ...mapGetters({
            authErrors: 'errorsModule/authErrors', 
            unauthError: 'errorsModule/unauthError',       
        })
    },
    methods: {
        /**
         * Getting actions from vuex store
         */
        ...mapActions({
            getSignUpData:'authModule/getSignUpData', 
            getLoginData: 'authModule/getLoginData',
            deleteAuthErrors: 'errorsModule/deleteAuthErrors',
            deleteUnauthError: 'errorsModule/deleteUnauthError',  

        }),
        /**
         * Sending data to Vuex store based on String that is passed.
         * @param {String} val 
         * 
         * And if login is successful re route to Home page
         */
       async  handleSubmit(val){
            if(val === 'Login')await  this.getLoginData(this.form)
            else await  this.getSignUpData(this.form)
            if(localStorage.getItem('token'))this.$router.push('/')
        }
    }, 
    beforeUnmount(){
        /**
         * Before component is unmounted/destroyed delete auth errors
         */
        this.deleteAuthErrors()
        this.deleteUnauthError()
    }
}
</script>

<style>
.errors{
    background-color: rgba(255, 146, 146, 0.692);
    color: rgb(209, 31, 31);
}
</style>