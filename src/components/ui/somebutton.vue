<script setup lang="ts">
import { computed, toRef } from "vue"
const props = defineProps<{
    isLoading?: boolean,
    disabled?: boolean,
    buttonType?:string
}>()
const isLoading = toRef(() => props.isLoading)
const disabled = toRef(() => props.disabled)
const isActive = computed(() => !disabled.value)
</script>

<template>
    <button :disabled="disabled || isLoading"
        :class="{ disabled: disabled, active: isActive, loading: isLoading }">

        <template v-if="isActive && !isLoading">
            <slot name="default">
                {{ "<Click me>" }}
            </slot>
        </template>

        <template v-if="disabled">
            <slot name="disabled-text">
                {{ "<Unclickable>" }}
            </slot>
        </template>

        <template v-if="isLoading">
            <div class="loader">
                <div class="loader__half left"></div>
                <div class="loader__half right"></div>
                <div class="loader__dot"></div>
            </div>
        </template>

    </button>
</template>

<style lang="scss" scoped>
button {
    padding: 7px 9px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    text-shadow: 1px 1px 2px rgba(40, 40, 40, 0.489);
    border-radius: 3px;
}

button.active {
    color: white;
    background-color: rgb(76, 139, 247);
    border: 1px solid rgb(54, 100, 180);
    cursor: pointer;

    &:active {
        background-color: rgb(64, 120, 215);
    }
}

button.loading {
    padding: 2px 2px;
    width: 1.8rem;
    height: 1.8rem;
    pointer-events: none;
}

button.disabled {
    color: rgb(40, 40, 40);
}

.loader {
    margin: auto;
    position: relative;
    width: 80%;
    height: 80%;
    animation: spin 1.3s linear infinite;

    &__half {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50%;
    }

    .left {
        left: 0;
        border-radius: 15px 0 0 15px;
        background-color: white;
    }

    .right {
        right: 0;
        border-radius: 0 15px 15px 0;
    }

    &__dot {
        position: absolute;
        width: 13px;
        height: 13px;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        border-radius: 50%;
        background-color: rgb(76, 139, 247);
    }
}

@keyframes spin {
    to {
        rotate: 0;
    }

    from {
        rotate: 360deg;
    }
}
</style>