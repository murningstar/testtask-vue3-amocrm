<script setup lang="ts">
import somebutton from "@/components/ui/somebutton.vue"
import someselect from '@/components/ui/someselect.vue';
import someinput from "@/components/ui/someinput.vue";
import { computed, ref } from "vue"
import axios from "axios"
import { useAuthStore } from "@/stores/authStore"
import { useCreationLogs } from "@/stores/creationLogsStore"
import { storeToRefs } from "pinia";
import type { CreationLog } from "@/types/CreationLog";

const options = ref([
    { value: 'none', template: 'Не выбрано', endpoint: null },
    { value: 'lead', template: 'Сделка', endpoint: 'leads' },
    { value: 'contact', template: 'Контакт', endpoint: 'contacts' },
    { value: 'company', template: 'Компания', endpoint: 'companies' },
])
// stores/auth.ts
const { isAuthed } = storeToRefs(useAuthStore())
// stores/creationLogs.ts
const creationLogs = useCreationLogs()
const selectedOption = ref('none')
const inputValue = ref('')
const isLoading = ref(false)
const currentEndpoint = computed(() => {
    const endpointIx = options.value.findIndex(option => option.value === selectedOption.value)
    return options.value[endpointIx].endpoint
})
async function dispatch() {
    isLoading.value = true
    let response
    try {
        response = await axios.post(`http://localhost:3000/${currentEndpoint.value}`, { name: inputValue.value })
    } catch (e) {
        console.log(e);
        isLoading.value = false
        return
    }
    isLoading.value = false
    const data = response.data
    const cleanedResponse: CreationLog = {
        name: data.name,
        type: data.type,
        id: data.cmsResponse["_embedded"]['contacts'][0].id
    }
    creationLogs.pushLog(cleanedResponse)
}
</script>

<template>
    <form class="form" action="" @submit.prevent="dispatch">
        <label class="form__label" for="someselect1">
            Что создаём?
        </label>
        <someselect id="someselect1" v-model="selectedOption" :options="options" />
        <template v-if="selectedOption !== 'none'">
            <hr class="form__hr">
            <label class="form__label" for="someinput1">
                Введите название сущности
            </label>
            <someinput v-model="inputValue" :placeholder="'Название'" />
            <hr class="form__hr">
            <somebutton :isLoading="isLoading" :buttonType="'submit'"
                :disabled="!isAuthed">
                <template #default>Создать</template>
                <template #disabled-text>Необходима авторизация</template>
            </somebutton>
        </template>
    </form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 260px;
    padding: 2rem 1rem;
    background-color: rgb(40, 40, 40);
    // padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.218);

    &__label {
        margin: 0 1rem;
        margin-bottom: 0.5rem;
    }

    &__hr {
        margin: 15px 0 15px 0;
        color: rgb(99, 99, 99);
        height: 1px;
        width: 60%
    }
}
</style>