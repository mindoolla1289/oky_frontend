<template>
    <div>
        <div class="login">
            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="username">
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed,ref } from 'vue'
import router from '../router';
import {useMainStore} from '../store/mainStore';
import TeacherAPI from '../services/TeacherAPI';


const username = ref('')
const password = ref('')


const store = useMainStore()

const props = defineProps({
    username: {type: [String]},
    password: {type: [String]},
})

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

// const user =  new User()
//     username: '',
//     password: '',



function submit() {
            store.Login(username.value,password.value)
            // store.dispatch('Login', this.user)
                .then(
                    () => {
                        console.log(TeacherAPI.getBaseUrl)
                        window.location.href = 'http://127.0.0.1:3000/'
                        // router.go('/');
                    })
                .catch(err =>{
                    console.log(err)
                })
            }


const emit = defineEmits(['submit'])

</script>

<style scoped>
.login {
    max-width: 500px;
    margin: auto;
}
</style>
