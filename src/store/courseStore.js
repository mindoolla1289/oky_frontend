import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import auth from '../services/Auth.js'
import { useLocalStorage } from '@vueuse/core'


export const useCourseStore2 = defineStore('course', {
    state: () => ({
        courseID: useLocalStorage('courseID',ref(null)),
        newLesson: ref(''),
        lesson: ref(''),
        readMode: ref(false),
        course_title: ref(''),
        course_description: ref(''),
    }),
    getters: {
        takeID(state) {
            return state.courseID
        },
        takeTitle(state) {
            return state.course_title
        },
        takeDescription(state) {
            return state.course_description
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
        SetCourseTitle(title) {
            this.course_title = title
        },
        SetCourseDescription(description) {
            this.course_description = description
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


export const useCourseStore = defineStore('course', () => {
    //state
    const courseID = useLocalStorage('courseID',ref(null))
    const newLesson = useLocalStorage('newLesson',ref(''))
    const lesson = useLocalStorage('lesson',ref(''))
    const readMode = useLocalStorage('readMode',ref(false))
    const course_title = useLocalStorage('course_title',ref(''))
    const course_description = useLocalStorage('course_description',ref(''))


    //getters
    // const doubleCount = computed(() => count.value * 2)

    const takeToken = computed(() => token.value)
    const takeID= computed(() => state.courseID)
    
    const takeTitle= computed(() =>state.course_title)
    const takeDescription= computed(() =>state.course_description)
    const takeNewLesson= computed(() =>state.newLesson)
    const takeLesson= computed(() =>state.lesson)
    const takeReadMode= computed(() =>state.readMode)

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