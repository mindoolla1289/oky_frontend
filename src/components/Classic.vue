<template>
    <div>
        <div class="editor">
            <CKEditor :data="data" :editor="Editor" :disabled="readMode" v-model="editorData" :config="editorConfig" @click="SetLesson"  @change="sendLessonData"/>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'
import Editor from 'ckeditor5-custom-build';
import 'ckeditor5-custom-build/build/translations/ru'
import { useCourseStore } from '../store/courseStore';


const store = useCourseStore()
const props = defineProps({
    modelValue: String,
    data: String,
})

const readMode = ref(store.takeReadMode)

const emit = defineEmits(['update:modleValue','giveData','sendLessonData'])

const editorData = ref(props.modelValue || '')
const data = ref('')


const editorConfig = ref({
    toolbar: {
        items: [
            'heading',
            '|',
            'fontColor',
            'fontFamily',
            'fontSize',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageInsert',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    },
    language: 'ru',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
})

// // Загрузка урока 
// const sendLessonData = (emit)=>{
//     editorData.value = store.takeLesson
//     debugger
//     console.log(data)
//     emit("sendLessonData",event.target.value)
// }

watch(editorData, () => {
    emit = ('update:modleValue',editorData.value,{ deep: true })
    store.SetNewLesson(editorData.value)
    
})


const dosomething = (content) => {
    editorData.value = content
    readMode.value = true 
    console.log('I am Batman, just kidding I am a chaild component')
}

defineExpose({
  dosomething
})

</script>



<style>
.editor {
    max-width: 1000px;
    margin: 100px auto;
}
.ck-editor__editable {
    min-height: 500px;
   }
</style>