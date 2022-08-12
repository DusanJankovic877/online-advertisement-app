<template>
  <div class="col-lg-7 m-auto">
    <form @submit.prevent>
        <div class="mb-3">
            <label for="userName" class="form-label">User name</label>
            <input type="text" class="form-control" id="userName" v-model="form.name">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="form.password">
        </div>
        <div class="mb-3" v-if="$route.params.option !== 'login'">
            <label for="telephone" class="form-label">Telephone</label>
            <input type="tel" class="form-control" id="telephone" v-model="form.telephone">
        </div>
        <div v-else></div>
        <button class="btn btn-primary" @click="handleSubmit()">{{$route.params.option === 'login' ? 'Login' : 'Sign up'}}</button>
    </form>
</div>
</template>

<script>
import { mapActions } from 'vuex'


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
        
    },
    methods: {
        ...mapActions({getSignUpData:'authModule/getSignUpData', getLoginData: 'authModule/getLoginData'}),
       async  handleSubmit(){

            console.log(this.$route.params);
            if(this.$route.params.option === 'login'){
                console.log('login', this.form);
                await  this.getLoginData(this.form)
            }else{
                await  this.getSignUpData(this.form)
            }
            if(localStorage.getItem('token'))this.$router.push('/')

        }
    }, 
    created(){

    }
}
</script>

<style>

</style>