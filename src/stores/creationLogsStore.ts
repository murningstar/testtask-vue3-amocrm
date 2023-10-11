import { watch, ref } from "vue";
import { defineStore } from "pinia";
import type { CreationLog } from "@/types/CreationLog";

export const useCreationLogs = defineStore("creationLogs", () => {
    const creationLogs = ref<CreationLog[]>([]);
    function pushLog(response: CreationLog) {
        creationLogs.value.push(response);
    }
    return { pushLog, creationLogs };
});
