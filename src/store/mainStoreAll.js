import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import auth from '../services/Auth.js'
import { useLocalStorage } from '@vueuse/core'

// import {injectStore} from "../services/API";

class LogedinUser {
    constructorusername(token, username, email, id, first_name, last_name, phoneNumbe, created_by) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.created_by = created_by;
        this.phoneNumbe = phoneNumbe;

    }
}
const user = {
    token: '',
    username: '',
    email: '',
    id: 0,
    first_name: '',
    last_name: '',
    created_by: '',
    phoneNumbe: '',
    is_teacher: false,

}
export const useMainStoreL = defineStore('main', {
    state: () => ({
        token: '',
        isLogedin: false,
        isTeacher: false,
        username: '',
        email: '',
        id: 0,
        first_name: '',
        last_name: '',
        created_by: '',
        phoneNumber: ''
    }),
    getters: {
        // takeToken(state) {
        //     return state.token
        // },
        takeID(state) {
            return state.id

        },
        // isLoged(state){
        //     if(state.isLogedin === true){
        //         return true
        //     }else{ return false }

        // },
        // isWho(state){
        //     if(state.isTeacher=== true){
        //         return true
        //     }else{ return false }

        // },
        // isLog() {
        //     if (localStorage.getItem('isLogedin') == null) {
        //         this.isLogedin = false
        //         return false
        //     } else {
        //         this.isLogedin = localStorage.getItem('isLogedin')
        //         return localStorage.getItem('isLogedin')
        //     }
        // },
        // isWho() {
        //     if (localStorage.getItem('isLogedin') == null) {
        //         this.isTeacher = false
        //         return false
        //     } else {
        //         if (String(localStorage.getItem('isTeacher')) == 'true') {
        //             return true
        //         } else { return false }
        //     }
        // },
        // TakeUser(user) {
        //     if (localStorage.getItem('isLogedin') == null) {

        //         return false
        //     } else {
        //         if (String(localStorage.getItem('isLogedin')) == 'true') {
        //             this.token = 'Bearer ' + user.access
        //             this.username = user.username
        //             this.email = user.email
        //             this.id = user.id
        //             this.first_name = user.first_name
        //             this.last_name = user.last_name
        //             this.created_by = user.created_by
        //             this.phoneNumber = user.phoneNumber
        //         } else { return false }
        //     }
        // },
    },
    actions: {
        async Login(username, password, state) {
            debugger
            const response = await (auth.loggin({
                username: username,
                password: password,
            }))
            debugger
            // if (response.status == 200) {
            // this.isLogedin = true
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            const userdata = JSON.parse(JSON.stringify(response.data.user))
            // const user = new LogedinUser
            state.token = 'Bearer ' + response.data.access
            state.username = userdata.username
            state.email = userdata.email
            state.id = userdata.id
            state.first_name = userdata.first_name
            state.last_name = userdata.last_name
            state.created_by = userdata.created_by
            state.phoneNumber = userdata.phoneNumber
            state.isTeacher = userdata.is_teacher
            // this.TakeUser(user)
            // var token = 'Bearer '+response.data.access
            // this.token = token
            // this.username = response.data.user.username
            // this.email = response.data.user.email
            // this.id = response.data.user.id
            // this.first_name = response.data.user.first_name
            // this.last_name = response.data.user.last_name
            // this.created_by = response.data.user.created_by
            // this.phoneNumbe = response.data.user.phoneNumbe
            // localStorage.setItem('username', response.data.user.username)

            localStorage.setItem('isLogedin', true)
            var it = response.data.user.is_teacher = true
            this.isTeacher = response.data.user.is_teacher
            // if (response.data.user.is_teacher  == true) {
            //     localStorage.setItem('isTeacher', true)
            //     this.isTeacher = true
            // } else {
            //     this.isTeacher = false
            //     localStorage.setItem('isTeacher', false)
            // }

            // } else {
            //     console.log(response.error)
            // }
        },
        Logout() {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isLogedin')
            localStorage.removeItem('isTeacher')
            localStorage.removeItem('user')
            localStorage.removeItem('username')
            this.token = null
            this.isTeacher = null
            this.isLogedin = null
            this.username = null
            this.email = null
            this.id = null
            this.first_name = null
            this.last_name = null
            this.created_by = null
            this.phoneNumbe = null

        },
        User() {
            axios.get('auth/users/me/')
                .then(({ data }) => {
                    commit('isTeacher', data.is_teacher)
                })
        }
    }


})




export const useCourseStore = defineStore('course', {
    state: () => ({
        courseID: ref(null),
        newLesson: ref(''),
        lesson: ref(''),
        readMode: ref(false)
    }),
    getters: {
        takeID(state) {
            return state.courseID
        },
        takeNewLesson(state) {
            return state.newLesson
        },
        takeLesson(state) {
            return state.lesson
        },
        takeReadMode(state) {
            return state.readMode
        }

    },
    actions: {
        SetCourseID(ID) {
            this.courseID = ID
        },
        SetNewLesson(lessonData) {
            this.newLesson = lessonData
        },
        SetLesson(lessonData) {
            this.lesson = lessonData
        },
        ActivateReadMode() {
            this.readMode = false
        },
        DeactivateReadMode() {
            this.readMode = true
        }

    }


})

export const useMainStore2 = defineStore('main', {
    state: () => ({
        token: '',
        isLogedin: false,
        isTeacher: false,
        username: '',
        email: '',
        id: 0,
        first_name: '',
        last_name: '',
        created_by: '',
        phoneNumber: ''
    }),
    getters: {
        // takeToken(state) {
        //     return state.token
        // },
        takeID(state) {
            return state.id

        },
        // isLoged(state){
        //     if(state.isLogedin === true){
        //         return true
        //     }else{ return false }

        // },
        // isWho(state){
        //     if(state.isTeacher=== true){
        //         return true
        //     }else{ return false }

        // },
        // isLog() {
        //     if (localStorage.getItem('isLogedin') == null) {
        //         this.isLogedin = false
        //         return false
        //     } else {
        //         this.isLogedin = localStorage.getItem('isLogedin')
        //         return localStorage.getItem('isLogedin')
        //     }
        // },
        // isWho() {
        //     if (localStorage.getItem('isLogedin') == null) {
        //         this.isTeacher = false
        //         return false
        //     } else {
        //         if (String(localStorage.getItem('isTeacher')) == 'true') {
        //             return true
        //         } else { return false }
        //     }
        // },
        // TakeUser(user) {
        //     if (localStorage.getItem('isLogedin') == null) {

        //         return false
        //     } else {
        //         if (String(localStorage.getItem('isLogedin')) == 'true') {
        //             this.token = 'Bearer ' + user.access
        //             this.username = user.username
        //             this.email = user.email
        //             this.id = user.id
        //             this.first_name = user.first_name
        //             this.last_name = user.last_name
        //             this.created_by = user.created_by
        //             this.phoneNumber = user.phoneNumber
        //         } else { return false }
        //     }
        // },
    },
    actions: {
        async Login(username, password, state) {
            debugger
            const response = await (auth.loggin({
                username: username,
                password: password,
            }))
            debugger
            // if (response.status == 200) {
            // this.isLogedin = true
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            const userdata = JSON.parse(JSON.stringify(response.data.user))
            // const user = new LogedinUser
            state.token = 'Bearer ' + response.data.access
            state.username = userdata.username
            state.email = userdata.email
            state.id = userdata.id
            state.first_name = userdata.first_name
            state.last_name = userdata.last_name
            state.created_by = userdata.created_by
            state.phoneNumber = userdata.phoneNumber
            state.isTeacher = userdata.is_teacher
            // this.TakeUser(user)
            // var token = 'Bearer '+response.data.access
            // this.token = token
            // this.username = response.data.user.username
            // this.email = response.data.user.email
            // this.id = response.data.user.id
            // this.first_name = response.data.user.first_name
            // this.last_name = response.data.user.last_name
            // this.created_by = response.data.user.created_by
            // this.phoneNumbe = response.data.user.phoneNumbe
            // localStorage.setItem('username', response.data.user.username)

            localStorage.setItem('isLogedin', true)
            var it = response.data.user.is_teacher = true
            this.isTeacher = response.data.user.is_teacher
            // if (response.data.user.is_teacher  == true) {
            //     localStorage.setItem('isTeacher', true)
            //     this.isTeacher = true
            // } else {
            //     this.isTeacher = false
            //     localStorage.setItem('isTeacher', false)
            // }

            // } else {
            //     console.log(response.error)
            // }
        },
        Logout() {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('isLogedin')
            localStorage.removeItem('isTeacher')
            localStorage.removeItem('user')
            localStorage.removeItem('username')
            this.token = null
            this.isTeacher = null
            this.isLogedin = null
            this.username = null
            this.email = null
            this.id = null
            this.first_name = null
            this.last_name = null
            this.created_by = null
            this.phoneNumbe = null

        },
        User() {
            axios.get('auth/users/me/')
                .then(({ data }) => {
                    commit('isTeacher', data.is_teacher)
                })
        }
    }


})

export const useMainStore = defineStore('counter', () => {
    //state
    const token = useLocalStorage('user/token','')
    const isLogedin = useLocalStorage('user/isLogedin',false)
    const isTeacher = useLocalStorage('user/isTeacher',false)
    const username2 = useLocalStorage('user/username2','')
    const email = useLocalStorage('user/email','')
    const id = useLocalStorage('user/id',0)
    const first_name = useLocalStorage('user/first_name','')
    const last_name = useLocalStorage('user/last_name','')
    const created_by = useLocalStorage('user/created_by','')
    const phoneNumber = useLocalStorage('user/phoneNumber','')


    //getters
    // const doubleCount = computed(() => count.value * 2)
    // const takeToken = computed(() => count.value * 2)
   const takeToken = computed(() => token.value)

    // takeToken(state) {
    //         return state.token
    //     }
    //     takeID(state) {
    //         return state.id

    //     }
    //     isLoged(state){
    //         if(state.isLogedin === true){
    //             return true
    //         }else{ return false }

    //     }
    //     isWho(state){
    //         if(state.isTeacher=== true){
    //             return true
    //         }else{ return false }

    //     }

    // actions
    // function increment() {
    //     count.value++
    // }

    async function Login(username, password) {

        const response = await (auth.loggin({
            username: username,
            password: password,
        }))

        if (response.status == 200) {
            localStorage.setItem('isLogedin', true)
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            const userdata = JSON.parse(JSON.stringify(response.data.user))

            token.value = 'Bearer ' + response.data.access
            username2.value = userdata.username
            email.value = userdata.email
            id.value = userdata.id
            first_name.value = userdata.first_name
            last_name.value = userdata.last_name
            created_by.value = userdata.created_by
            phoneNumber.value = userdata.phoneNumber
            isTeacher.value = userdata.is_teacher
            isLogedin.value = true
            // this.TakeUser(user)
            // var token = 'Bearer '+response.data.access
            // this.token = token
            // this.username = response.data.user.username
            // this.email = response.data.user.email
            // this.id = response.data.user.id
            // this.first_name = response.data.user.first_name
            // this.last_name = response.data.user.last_name
            // this.created_by = response.data.user.created_by
            // this.phoneNumbe = response.data.user.phoneNumbe
            // localStorage.setItem('username', response.data.user.username)

            // localStorage.setItem('isLogedin', true)
            // var it = response.data.user.is_teacher = true
            // this.isTeacher = response.data.user.is_teacher
            // if (response.data.user.is_teacher  == true) {
            //     localStorage.setItem('isTeacher', true)
            //     this.isTeacher = true
            // } else {
            //     this.isTeacher = false
            //     localStorage.setItem('isTeacher', false)
            // }

        } else {
            return console.log(response.error)
        }
    }

    function Logout() {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('isLogedin')
        localStorage.removeItem('isTeacher')
        localStorage.removeItem('user')
        localStorage.removeItem('username')
        token.value =''
        username2.value = ''
        email.value = ''
        id.value = 0
        first_name.value = ''
        last_name.value = ''
        created_by.value = ''
        phoneNumber.value = ''
        isTeacher.value = false
        isLogedin.value = false

    }
    // async function updateToken (){
    //     const res = await axios.post('/auth/jwt/refresh',{headers: {Authorization: localStorage('refresh')} })
    //     if(res.status = 200){
    //         token.value = 'Bearer '+res.data.access
    //     }
        
    // }

    return {
        //state
        token,
        isLogedin,
        isTeacher,
        username2,
        email,
        id,
        first_name,
        last_name,
        created_by,
        phoneNumber,
        

        //getters
        // doubleCount,
        takeToken,
        //actions
        // increment,
        Login,
        Logout,
        // updateToken,
    }
})