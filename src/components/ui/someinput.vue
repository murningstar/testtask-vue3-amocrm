<script setup lang="ts">
const props = defineProps<{
    modelValue: string,
    placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])
const modelHandler = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
        
<template>
    <input type="text" :value="props.modelValue" @input="modelHandler"
        :placeholder="placeholder || 'Ввод сюда'">
</template>

<style scoped lang="scss">
input {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 3px;
    background-color: rgb(54, 105, 193);
    color: white;
    height: 1.8rem;
    width: 8rem;
    padding-left: 6px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.396);
    border: none;
    box-shadow: inset 0 0 2px 0 black;
}

input:focus {
    outline: double 4px rgb(255, 255, 255);
}
</style>