<template>
    <div class="scores -mt-3 w-52 h-28 md:mt-0 md:w-64 md:h-36 grid grid-cols-2 grid-rows-2 font-['Anton'] text-orange-900">
        <div class="col-span-2 flex justify-center items-center pb-2.5 md:pb-3 text-lg">Hola {{ userName.substring(0,20) }}!</div>
        <div class="flex flex-col items-center text-xs pt-1.5 md:text-base md:pt-0">
            <span>Aciertos</span>
            <div :class="[animationHit ? `animate-ping`: ``]">{{ hits }}</div>
        </div>
        <div class="flex flex-col items-center text-xs pt-1.5 md:text-base md:pt-0">
            <span>Errores</span>
            <div :class="[animationError ? `animate-ping`: ``]">{{ errors }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useUser from '@/composables/useUser'
import { useMemoryGame } from '@/stores/game'

const { getUser } = useUser()
const { userName } = getUser()

const game = useMemoryGame()
const { hits, errors } = storeToRefs(game)

const animationHit = ref(false)
const animationError = ref(false)

watch(
    [hits, errors],
    ([newHit, newError], [prevHit, prevError]) => {
        if (newHit !== prevHit) animations(animationHit)
        if (newError !== prevError) animations(animationError)
    }
)

const animations = (anim) => {
    anim.value = true
    setTimeout(() => {
        anim.value = false
    }, 500);
}
</script>

<style scoped>
.scores {
    background-image: url('@/assets/user-score-background.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
}
</style>