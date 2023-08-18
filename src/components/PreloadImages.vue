<template>
    <div class="loader absolute top-0 h-screen w-screen mx-auto flex items-center justify-center bg-black/90 font-['Anton'] text-orange-900">
        <div class="loader__container w-80 h-80 md:w-2/4 max-w-2xl flex flex-col items-center justify-center pl-1 pt-12">
            <span class="font-medium md:mb-5 text-md md:text-2xl text-center">Cargando {{ game.percentage }}%...</span>
        </div>
    </div>
</template>

<script setup>
import { useMemoryGame } from '@/stores/game' 
const game = useMemoryGame()
</script>