<template>
    <div class="congrats absolute top-0 h-[calc(100dvh)] w-screen mx-auto flex items-center justify-center bg-black/90 font-['Anton'] text-orange-900">
        <div class="congrats__container w-80 h-80 md:w-2/4 max-w-2xl flex flex-col items-center justify-center pl-1 pt-12">
            <span class="font-medium md:mb-5 text-md md:text-2xl text-center">Felicitaciones <br>{{ userName.substring(0,10) }} !!</span>
            <button
                @click="game.resetGame"
                class="bg-orange-900 px-5 py-1 rounded text-white text-sm w-24 md:w-36 hover:bg-orange-700">
                Volver a jugar?
            </button>
        </div>
    </div>
</template>

<script setup>
import { useMemoryGame } from '@/stores/game'
import useUser from '@/composables/useUser'

const game = useMemoryGame()
const { getUser } = useUser()
const { userName } = getUser()
</script>

<style scoped>
.congrats__container {
    background-image: url('@/assets/save-name-background.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))
}
</style>