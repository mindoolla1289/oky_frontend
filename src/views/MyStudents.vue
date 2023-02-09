<template>
    <div class="mystudents">
        <div class="courses">
            <li v-for="student in students" :key="student.id" style="list-style-type: none;">
                <div class="card" style="width: 60rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ student.StudentAPI4 }}</h5>
                        <p class="card-text">{{ student.email }}</p>
                        <p class="card-text">{{ student.first_name }}</p>
                        <p class="card-text">{{ student.last_name }}</p>
                        <p class="card-text">{{ student.phoneNumber }}</p>
                        <!-- <a href="#" @click="toCourse(student.id,student.title,student.description)" class="stretched-link"></a> -->
                        <button type="submit" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">Submit</button>
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import TeacherAPI from '../services/TeacherAPI'

const students = ref([])

onMounted(async () => {
    try {
            const response =  await TeacherAPI.getStudents();
            debugger
            students.value = response.data
            // console.log(students)
            console.log(students.value)

        } catch (err) {
            console.log(err)
        }
})
// mounted(){
//     try {
//             const response = TeacherAPI.getStudents();
//             this.students = response.data
//             return this.students
//         } catch (err) {
//             console.log(err)
//         }
// }

</script>

<style scoped>
.mystudents {
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
</style>