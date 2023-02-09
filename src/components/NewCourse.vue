<template>
    <div class="newCourse">
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Название курса</label>
                <input :title="props.title" v-model="title" type="title" class="form-control"
                    id="exampleFormControlInput1" placeholder="Название курса">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Описание курса</label>
                <textarea :description="props.description" v-model="description" class="form-control"
                    id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary"
                style="background-color: #59c680; border: #59c680;">Создать</button>
        </form>
    </div>
</template>

<script setup>
import router from '../router';
import { useMainStore } from '../store/mainStore';

import TeacherAPI from '../services/TeacherAPI'

const store = useMainStore()
var token = 'Bearer ' + store.takeToken

let title = ""
let description = ""

var id = store.takeID

const props = defineProps({
    title: { type: [String] },
    description: { type: [String] },
})

function submit() {
    var cours = {
        "title": title,
        "description": description,
        "creator": id,
        "teachers": [id]
    }
    debugger
    TeacherAPI.createCourse(cours, token)
        .then(
            () => {
                router.replace({ name: 'mycourses' })
            })
        .catch(err => {
            console.log(err)
        })
}


const emit = defineEmits(['submit'])

</script>

<style scoped>
.newCourse {
    max-width: 1100px;
    margin: auto;
    background-color: #d5d6d1;
}
</style>