<template>
  <input type="text" placeholder="Name" v-model="name" @input="$emit('update:modelValue', $event.target.value)" />
  <div>
    <button @click="onClickButton" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">
      childButton</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref("Childe");
const emit = defineEmits(['giveData'])
const eData = ref('Edata child ')
function onClickButton(eData) {
  emit = ('giveData', eData)

}
const dosomething = () => {
  console.log('I am Batman, just kidding I am a chaild component')
}
defineExpose({
  dosomething
})
</script>