<template>
    Parent: {{ name }}
    <TestChaild v-model="name" @clicked="onClickChild" ref="TestChaildComponentRef" />
    <input type="text" placeholder="Name" v-model="name" />
    <div> {{ name2 }}</div>
    <h3>{{ name2.value }}</h3>
    <h3>{{ name.value }}</h3>

    <button @click="show" class="btn btn-primary" style="background-color: #59c680; border: #59c680;">button</button>
    <div>
        <h3>{{ name2}}</h3>
        <h3>{{ name}}</h3>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import TestChaild from "../components/TestChaild.vue";

const name = ref("");
const name2 = ref("");
name2.value = name.value
const input = ref('')
const TestChaildComponentRef = ref()
function show() {
    debugger
    name2.value = input.value
    return name2.value
}
function onClickChild(value) {
    debugger
    console.log(value)
    
}
onMounted(() => {
    TestChaildComponentRef.value.dosomething()
})

</script>