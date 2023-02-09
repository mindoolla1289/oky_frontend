import { createRouter, createWebHistory } from 'vue-router'
import pinia from '../store/index'
import { useMainStore } from '../store/mainStore'

import Home from '../views/Home.vue'
import MyCourses from '../views/MyCourses.vue'
import Login from '../views/Login.vue'
import Course from '../views/Course.vue'
import Lesson from '../views/Lesson.vue'
import MyStudents from '../views/MyStudents.vue'
import NewCourse from '../components/NewCourse.vue'
import NewLesson from '../components/NewLesson.vue'
import Parent from '../views/Parent.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mycourses',
        name: 'mycourses',
        component: MyCourses
    },
    {
        path: '/mystudents',
        name: 'mystudents',
        component: MyStudents
    },
    {
        path: '/course/:id',
        name: 'course',
        component: Course
    },
    {
        path: '/lesson/:id',
        name: 'lesson',
        component: Lesson
    },
    {
        path: '/mycourses/new',
        name: 'NewCourse',
        component: NewCourse
    },
    {
        path: '/lesson/new',
        name: 'NewLesson',
        component: NewLesson
    },
    {
        path: '/parent',
        name: 'parent',
        component: Parent
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const store = useMainStore(pinia)
    if (
        
      // make sure the user is authenticated
      store.isLogedin == false &&
      to.name !== 'login'
    ) {
      // redirect the user to the login page
      return { name: 'login' }
    }
  })
export default router;
