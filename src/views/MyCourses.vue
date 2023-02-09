<template>
    <div class="mycourses">
        <router-link :to="{ name: 'NewCourse' }">
            <div class="button">
                <div class="d-grid gap-2">
                    <button class="btn btn-success" type="button">Создать новый курс</button>
                </div>
            </div>
        </router-link>
        <div class="courses">
            <li v-for="item in items" :key="item.id" style="list-style-type: none;">
                <div class="card" style="width: 60rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <a href="#" @click="toCourse(item.id,item.title,item.description)" class="stretched-link"></a>
                        <button type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Submit</button>
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useMainStore } from '../store/mainStore';
import { useCourseStore } from '../store/courseStore'
import router from '../router';

import TeacherAPI from '../services/TeacherAPI'
import Right from '../components/Right.vue'
// const store = useMainStore()


// let items = ref([])
// var token = 'Bearer ' + store.takeToken

// onMounted(async () => {
//     debugger

//     try {
//         const response = await TeacherAPI.getCourses(token);
//         items.value = response.data
//         debugger
//     } catch (err) {
//         console.log(err)
//     }
// })

export default {
    setup() {
        const store = useMainStore()
        let items = ref([])
        const CourseStore = useCourseStore()

        return {
           items, CourseStore
        }
    },

    async mounted() {
        try {
            var response = await TeacherAPI.getCourses();
            this.items = response.data
            return this.items
        } catch (err) {
            console.log(err)
        }
    },
    watch: {
            async getItems() {
                
                var response = await TeacherAPI.getCourses();
                this.items = response.data
            }
        },
    methods: {
        toCourse(id,title,discription) {
            const CourseStore = useCourseStore()
            CourseStore.SetCourseID(id)
            CourseStore.SetCourseTitle(title)
            CourseStore.SetCourseDescription(discription)
            router.push({ name: 'course', params: { id: id } })
        },
       
    }
}
</script>

<style scoped>
.courses {
    max-width: 1100px;
    margin: auto;
    background-color: #338b7f;
}

.card {
    margin: auto;
    margin: 20 px auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;
    border-color:rgb(118, 135, 30) ;

}

.button {
    max-width: 1100px;
    margin: 20px auto;
    background-color: #38a65f;

}
</style>