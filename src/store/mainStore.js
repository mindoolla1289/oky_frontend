import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import auth from '../services/Auth.js'
import { useLocalStorage } from '@vueuse/core'


export const useMainStore = defineStore('main', () => {
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

   const takeToken = computed(() => token.value)


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