import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
    const isAuthed = ref(false);

    const authorizing = ref(false);

    async function authorize() {
        authorizing.value = true;
        const response = await axios.get(
            "http://localhost:3000/oauth-client-server"
        );
        const data = response.data;
        const success = Math.floor(response.status / 100) === 2;
        authorizing.value = false;
        if (success) {
            isAuthed.value = true;
        }
        // sessionStorage.setItem("creds", JSON.stringify(data));
        console.log(data);
    }

    return { isAuthed, authorize, authorizing };
});
