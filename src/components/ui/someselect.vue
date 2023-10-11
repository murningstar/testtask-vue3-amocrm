<script setup lang="ts">
import { computed, toRef } from "vue"
const props = defineProps<{
    options: { value: string, template: string }[],
    modelValue:string
}>()
const options = toRef(() => props.options)

const emit = defineEmits(['update:modelValue'])
function handleChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
    <select @change="handleChange" :value="modelValue">
        <option :value="option.value" v-for="option in options">
            {{ option.template }}
        </option>
    </select>
</template>

<style scoped lang="scss">
select {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 3px;
    background-color: rgb(76, 139, 247);
    color: white;
    height: 1.8rem;
    min-width: 8rem;
    padding-left: 6px;
    border: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.396);
    cursor: pointer;

    option {
        background-color: rgb(49, 106, 206);
        margin: 0;
        text-transform: capitalize;
    }
}
</style>