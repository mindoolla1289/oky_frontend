<template>
    <div class="course">
        <div class="lessons">
            <li v-for="lesson in course" style="list-style-type: none;">
                <div class="card" style="width: 60rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ lesson.title }}</h5>
                        <p class="card-text">{{ lesson.discription }}</p>
                        <router-link :to="{ name: 'lesson', params: { id: lesson.id } }">
                            <a href="#" class="stretched-link"></a>
                        </router-link>
                    </div>
                </div>
            </li>
        </div>
        <div class="sidebar">
            <p>{{title}}</p>
            <p>{{description}}</p>
            <div class="button">
                <button @click="updateCourse" type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Обновить</button>
            </div>
            <div class="button">
                <button @click="deleteCourse" type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Удалить курс и уроки</button>
            </div>
            <div class="button">
                <router-link :to="{ name: 'NewLesson' }">
                    <button type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Создать новый урок</button>
                </router-link>
            </div>

        </div>
    </div>
</template>


<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '../store/mainStore';
import { useCourseStore } from '../store/courseStore'
import TeacherAPI from '../services/TeacherAPI'

export default {
    setup() {
        const course = ref({})
        const store = useMainStore()
        const route = useRoute();
        const CourseStore = useCourseStore()
        const title = CourseStore.takeTitle
        const description = CourseStore.takeDescription
        return {
            route, course,title, description,CourseStore
        }
    },

    async mounted() {

        await TeacherAPI.getLessons(this.route.params.id)
            .then(({ data }) => {
                this.course = data
            })
    },
    methods:{
        updateCourse(){

        },
        deleteCourse(){
            
        }

    },
    watch: {
        async getItems() {
            var response = await TeacherAPI.getCourses();
            debugger
            this.items = response.data
        }
    }
}
</script>

<style scoped>
.course {

    background-color: #46dfcb;
    display: flex;
    justify-content: space-between;
}
.lessons{
    margin: auto;
    margin-left: auto;
    margin-right: auto;
}

.card {
    margin: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2em;

}

.card-body {
    margin: 20 em auto;

}

.button {
    max-width: 1100px;
    margin: 20px auto;

}

.li {
    list-style-type: none;
}

.sidebar {
    margin-top: 2em;
    margin-right: 2em;
    position: sticky;
    top: 40px, left, -60px;
    max-width: 500px;
    width: 400px;
    height: 400px;
    border-right: 400px;
    background-color: #0a7f08fa;
    color: rgb(255, 255, 255);
    text-align: center;
}
</style>