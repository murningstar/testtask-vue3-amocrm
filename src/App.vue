<script setup lang="ts">
import somebutton from "@/components/ui/somebutton.vue"
import someform from "./components/someform.vue"
import { useAuthStore } from "@/stores/authStore"
import { useCreationLogs } from "./stores/creationLogsStore"
import { useSessionateLogs } from "@/composables/useSessionateLogs"
import { storeToRefs } from "pinia";
useSessionateLogs()
const creationLogsStore = useCreationLogs()
const { creationLogs } = storeToRefs(creationLogsStore)
const auth = useAuthStore()
const { authorizing, isAuthed } = storeToRefs(auth)
const { authorize } = auth

</script>

<template>
  <div class="wrapper">

    <header class="header">
      <div class="container header__content">
        <div class="header__logo logo">
          <img class="logo__img" src="@/assets/logo.webp" alt="">
        </div>
        <somebutton @click="authorize" :isLoading="authorizing"
          :disabled="isAuthed">
          <template #default> Авторизоваться </template>
          <template #disabled-text> Авторизовано </template>
        </somebutton>
      </div>
    </header>

    <main class="main">
      <div class="container main__content">
        <div class="logs">
          <div class="logs__log" v-for="log in creationLogs">
            {{ log }}
          </div>
        </div>
        <someform />
      </div>
    </main>

    <footer class="footer">
      <div class="container footer__content">
        @footer/testtask-vue3-amocms
      </div>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  // background-color: rgba(255, 0, 0, 0.042);
  height: 100%;
  min-width: 280px;
  padding: 0 10px;
  z-index: 1;
}

@media (min-width: 768px) {
  .container {
    width: 650px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 900px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
}


.header {
  background-color: #282828;
  height: 3rem;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.922);
  width: 100%;
  overflow: hidden;
  z-index: 1;

  &__content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.logo {
  aspect-ratio: 1;
  height: 75%;
  position: relative;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    inset: 0;
    scale: 1.7;
    position: absolute;
    content: '';
    background-image: url('/src/assets/logo.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(13px);
    opacity: 20%;
  }
}

.main {
  width: 100%;
  flex: 1 1 0;
  position: relative;
  overflow: hidden;
  background-color: rgb(36, 36, 36);
  z-index: 0;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 2;
    gap: 1rem;
  }

  // Moving background
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background-image: url("/src/assets/texture.webp");
    background-size: cover;
    background-repeat: repeat;
    background-position: center;
    filter: blur(20px);
    opacity: 30%;
    scale: 4;
    animation: bg-motion cubic-bezier(0.3, 0, 0.72, 1) 120s infinite;
    pointer-events: none;
  }
}

.logs {
  font-family: 'Cascadia Code', sans-serif;
  font-size: 12px;
}





.footer {
  margin-top: auto;
  width: 100%;
  border-top: 1px solid #262626;
  min-height: 2rem;
  height: 1px;
  position: relative;
  background-color: rgb(63, 63, 63);

  &__content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(35, 35, 35);
    text-shadow: 1px 1px 2px rgb(43, 43, 43);
  }
}

@keyframes bg-motion {
  0% {
    transform: translate(0 0);
    scale: 4;
  }

  25% {
    transform: translate(100px, -100px);
    scale: 3.5;
  }

  50% {
    transform: translate(-100px, -100px);
    scale: 3;
  }

  75% {
    transform: translate(-100px, 100px);
    scale: 3.5;
  }

  100% {
    transform: translate(0 0);
    scale: 4;
  }
}
</style>
@/stores/authorize@/stores/auth@/stores/authStore