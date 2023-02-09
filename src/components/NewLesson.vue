<template>
    <div class="newLesson">
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Название урока</label>
                <input v-model="title" type="title" class="form-control"
                    id="exampleFormControlInput1" placeholder="Название урока">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Описание урока</label>
                <input v-model="description" type="description" class="form-control"
                    id="exampleFormControlTextarea1" rows="3">
            </div>
            <Classic  @givaData2 = "fuunn" :cont="props.cont" v-model="content" />
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button  class="btn btn-primary"
                    style="background-color: #59c680; margin-right: 10em; border: #59c680;">Создать</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router';
import { useMainStore } from '../store/mainStore';
import { useCourseStore } from '../store/courseStore'
import Classic from '../components/Classic.vue'

import TeacherAPI from '../services/TeacherAPI'

const store = useMainStore()
const storeCourse = useCourseStore()
storeCourse.ActivateReadMode()
const content = ref('')
var token = 'Bearer ' + store.takeToken

var courseID = storeCourse.takeID
const title = ref('')
const description = ref('')
const cont = ref('')
const funck =()=>{
    console.log('hi')
}
const props = defineProps({
    title: { type: [String] },
    description: { type: [String] },
    cont:{ type: [String] },
})

const contentFromStore = ref('')

function submit() {
    const lesson = {
        "number": 1,
        "title": title.value,
        "description": description.value,
        "content": storeCourse.takeNewLesson,
        "course": storeCourse.takeID

    }
    var testContent = storeCourse.takeNewLesson
    debugger
    const testDics = description
    debugger

  
    TeacherAPI.createLesson(lesson, token)
        .then(
            () => {
                router.replace({ name: 'course',params:{id: storeCourse.takeID} })
            })
        .catch(err => {
            console.log(err)
        })
}

function fuunn(data){
    debugger
    console.log('hi')
    console.log(data)

}
const emit = defineEmits(['submit'])

var newLesson = {
    "number": 1,
    "title": "Первый урок по физике за 9 класс",
    "discription": "Первый урок по физике за 9 класс-------------------------------------------------------",
    "content": "",
    "course": 16
}
function giveData(){

}
</script>

<style scoped>
.newLesson {
    max-width: 1100px;
    margin: auto;
    background-color: #d5d6d1;
}
</style>