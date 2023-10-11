import { useCreationLogs } from "@/stores/creationLogsStore";
import { onMounted, watch } from "vue";
export function useSessionateLogs() {
    const creationLogs = useCreationLogs();
    watch(creationLogs.creationLogs, (newValue) => {
        sessionStorage.setItem("creationLogs", JSON.stringify(newValue));
    });
    onMounted(() => {
        const cached = sessionStorage.getItem("creationLogs");
        if (!cached) {
            return;
        }
        const obtainedCache = JSON.parse(cached) as [];
        obtainedCache.forEach((log) => creationLogs.pushLog(log));
    });
}
