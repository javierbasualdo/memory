<template>
    <main class="user h-screen w-screen mx-auto flex items-center justify-center bg-black/60">
        <div class="user__container w-80 h-80 md:w-2/4 max-w-2xl flex flex-col items-center justify-center pl-1 pt-12 font-['Anton'] text-orange-900">
            <label class="font-medium" for="username">Nombre</label>
            <input 
                v-model="text"
                type="text" 
                name="username"
                id="username"
                @keyup.enter="saveUser"
                class="w-20 md:w-36 my-2 outline outline-1 outline-green-600 bg-white rounded px-2 text-center"
            >
            <button
                @click="saveUser"
                class="bg-orange-900 px-5 rounded text-white md:w-36 hover:bg-orange-700">
                Jugar
            </button>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import useUser from '@/composables/useUser'

const { setUser } = useUser()
const text = ref(null)

const saveUser = () => {
    setUser(text.value)
}
</script>

<style scoped>
.user__container {
    background-image: url('@/assets/save-name-background.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))
}
</style>