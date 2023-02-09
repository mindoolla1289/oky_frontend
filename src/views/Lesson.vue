<template>
    <div class="lessonView">
        <div>
            <pre>{{ lesson.title }}</pre>
            <div class="sk">
                <textarea class="ckeditor">{{ lesson.content }}</textarea>
                <Classic v-model="content" ref="TestChaildComponentRef" :disabled="true" />
            </div>
        </div>
    </div>
</template>


<!-- <script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';

import Classic from '../components/Classic.vue'
import axios from 'axios';
const content = ref('')
const lesson = ref({})
const route = useRoute();



onMounted (() => {
    axios.get(`api/v1/lesson/${route.params.id}`)
        .then(({data}) =>{
            debugger;
            lesson.value = data,
            content.push(data.content)
        })
})
:disabled="editorDisabled"

</script> -->

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '../store/mainStore';
import {useCourseStore} from '../store/courseStore'
import TeacherAPI from '../services/TeacherAPI'
import Classic from '../components/Classic.vue'

export default {
    setup() {
        // const content = ref('')
        const lesson = ref({})
        const store = useMainStore()
        const coureStore = useCourseStore()
        const TestChaildComponentRef = ref()

        // const takeTheData=(event)=>{
        //     console.log('fuck v setup')
        //     console.log(event)
        // }
        // TestChaildComponentRef.value.dosomething()
        var token = 'Bearer ' + store.takeToken
        const route = useRoute();
        return {
            route, token,  lesson,coureStore,TestChaildComponentRef
        }
    },
    mounted() {
        // var testdata = this.content
        this.coureStore.ActivateReadMode()
        
        TeacherAPI.getLesson(this.route.params.id)
            // axios.get(`api/v1/lesson/all/${route.params.id}`)
            .then(({ data }) => {
                this.lesson = data
                this.content = data.content
                this.coureStore.SetLesson(data.content)
                this.TestChaildComponentRef.dosomething(data.content)
                function takeTheData(){
                    console.log('fuck v setup')
                    console.log(event)
        }
                return this.lesson,this.content,takeTheData
            })

        // Editor
        //     .create(document.querySelector('#editor'), {
        //         initialData: data.content
        //     })
        //     .then(... )
        //     .catch(... );
    },
    watch: {
        async getItems() {
            var token = this.token
            var response = await TeacherAPI.getCourses(token);
            this.items = response.data
        }
    },
    methods:{
        takeTheData(event){
            console.log(event)
        }
    }
    // name: 'app',
    //     data() {
    //         return {
    //             editor: ClassicEditor,
    //             editorData: '<p>Content of the editor.</p>'
    //         };
    //     },
    //     methods: {
    //         emptyEditor() {
    //             this.editorData = '';
    //         }
    //     }
}



</script>

<style scoped>
.lessonView{

    max-width: 1100px;
    margin: auto;
    background-color: #d1bb6a;
}
</style>