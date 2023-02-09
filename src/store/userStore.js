import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import axios from '../axios'

export const useMainStore = defineStore('main', {
    state: () => ({
            token: ref(null),
            isLogedin: ref(false),
            isTeacher: ref(false),
            
    }),
    getters: {
        isKirdi: (state) => state.isLogedin  = localStorage.getItem('isLogedin'),
        isKim: (state) => state.isTeacher  = localStorage.getItem('isTeacher'),


        takeToken(){
            this.token = localStorage.getItem('access')
            return localStorage.getItem('access')
        },
        isLog() {
            if (localStorage.getItem('isLogedin') == null) {
                this.isLogedin = false
                return false
            } else {
                this.isLogedin = localStorage.getItem('isLogedin')
                return localStorage.getItem('isLogedin')
            }
        },
        isWho() {
            debugger
            if (localStorage.getItem('isTeacher') == null) {
                this.isTeacher = false
                return false
            } else {
                if(String(localStorage.getItem('isTeacher'))=='true'){
                    return true
                }else{return false}
                // var zhopa = (localStorage.getItem('isTeacher') === 'true')
                // this.isTeacher = localStorage.getItem('isTeacher')
                // debugger
            }
        },
    },
    actions: {
        async Login(username, password) {
            const response = await axios.post('auth/jwt/create', {
                username: username,
                password: password,
            })
            if (response.status == 200) {
                debugger
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                localStorage.setItem('isLogedin', true)
                if(String(response.data.isTeacher)=='true'){
                    localStorage.setItem('isTeacher', true)
                    this.isTeacher = true
                }else{
                    this.isTeacher = false
                    localStorage.setItem('isTeacher', false)}

            } else {
                console.log(response.error)
            }
        },
        Logout() {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isLogedin')
            localStorage.removeItem('isTeacher')
            this.token = null
            this.isTeacher = null
            this.isLogedin = null

        },
        User() {
            axios.get('auth/users/me/')
                .then(({ data }) => {
                    debugger
                    commit('isTeacher', data.is_teacher)
                })
        }
    }


})