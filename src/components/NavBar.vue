<template>
    <nav class="navbar navbar-expand-lg .bg-blue" style="background-color: #38a65f;" type="dark">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" style="text-decoration: none;">
                <a class="navbar-brand" style="color: #fafffc;">Okyoky.kz</a>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul v-if="store.isLogedin" class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li  class="nav-item">
                        <router-link :to="{ name: 'mycourses' }" tag="button" style="text-decoration: none;">
                            <a  class="nav-link active" aria-current="page" style="color: #fafffc;">Мои курсы</a>
                        </router-link>
                    </li>
                    <li  v-if="store.isTeacher" class="nav-item">
                        <router-link :to="{ name: 'mystudents' }" tag="button" style="text-decoration: none;">
                            <a  class="nav-link" style="color: #fafffc;">Мои студенты</a>
                        </router-link>
                    </li>
                </ul>
                <b-navbar-nav class="ml-auto">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li v-show="!store.isLogedin" class="nav-item">
                            <router-link :to="{ name: 'login' }" tag="button" style="text-decoration: none;">
                                <a class="nav-link" style="color: #fafffc;">Login</a>
                            </router-link>
                        </li>
                        <!-- v-show="store.isLogedin" -->
                        <li>
                            <b-button size="sm" class="my-2 my-sm-0" type="button" @click="hundleClick">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                                    class="bi bi-door-open" viewBox="0 0 16 16">
                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z">
                                    </path>
                                    <path
                                        d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z">
                                    </path>
                                </svg>
                            </b-button>
                        </li>
                    </ul>
                </b-navbar-nav>

            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref,computed } from 'vue'
import router from '../router';
import  {useMainStore}  from '../store/mainStore';

const store = useMainStore()

var token = null 
if (localStorage.getItem('isLogedin') == null){
    token = store.takeToken
}
function hundleClick() {
    store.Logout()
    router.go("/login");


}
</script>
<!-- 
<script>
import { storeToRefs } from 'pinia'
import { useMainStore2 } from '../store/mainStore';
import {defineComponent,computed} from 'vue'
import router from '../router';

export default defineComponent({
    setup() {
        const store = useMainStore2()
        // `name` and `doubleCount` are reactive refs
        // This will also create refs for properties added by plugins
        // but skip any action or non reactive (non ref/reactive) property
        const { token, isLogedin, isTeacher, isLog, isWho, takeToken, } = storeToRefs(store)
        const isTest = store.isTeacher
        // the increment action can just be extracted
        const { Login, Logout } = store

        return {
            store,token, isLogedin, isTeacher, isLog, isWho, takeToken, Login, Logout,isTest,
        }
    },
    methods: {
        hundleClick() {
            this.store.Logout()
            router.go("/login");


        }
    },
})
</script> -->

<!-- <script>
import router from '../router';

import { useMainStore } from '../store/mainStore';
// const store = useMainStore()

export default {
    setup() {
        const mainStore = useMainStore()
        function hundleClick() {
            mainStore.Logout()
            debugger
            router.go("/login");


        }
        return { mainStore },hundleClick
    },
    computed: {
        isLog() {
            debugger
            return this.mainStore.isLog
        },
        isWho() {
            return this.mainStore.isWho
        },
    },
    hundleClick() {
        mainStore.Logout()
        debugger
        router.go("/login");
    }
}
</script> -->