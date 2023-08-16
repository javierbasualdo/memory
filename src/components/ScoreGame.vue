<template>
    <div class="score-content w-64 h-36 grid grid-cols-2 grid-rows-2 font-['Anton']">
        <div class="col-span-2 flex justify-center items-center pb-3 text-lg">Hola {{ userName }}!</div>
        <div class="flex flex-col items-center">
            <span>Aciertos</span>
            <div>{{ hits }}</div>
        </div>
        <div class="flex flex-col items-center">
            <span>Errores</span>
            <div>{{ errors }}</div>
        </div>
    </div>
</template>

<script setup>
import useUser from '@/composables/useUser'
import { useMemoryGame } from '@/stores/game'

const { getUser } = useUser()
const { hits, errors } = useMemoryGame()

const { userName } = getUser()
</script>

<style scoped>
.score-content {
    background-image: url('@/assets/user-score-background.png');
    background-size: contain;
    background-repeat: no-repeat;
}
</style>