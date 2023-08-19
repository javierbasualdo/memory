<template>
    <main class="h-[calc(100dvh)] max-w-screen-lg mx-auto grid grid-cols-1 grid-rows-1 p-5">
        <div v-if="game.imagesReady" class="grid grid-rows-6 gap-2 md:gap-4">
            <section class="row-span-1 grid place-content-center">
                <ScoreGame/>
            </section>
            <section class="row-span-5 grid grid-cols-3 grid-rows-6 gap-2 md:grid-cols-6 md:grid-rows-3 md:gap-4">
                <CardGame 
                    v-for="(card, index) in game.cards" 
                    :key="index"
                    :info="card"
                    :data-index="index"
                    @click="flipCard($event)"
                />
            </section>
        </div>
    </main>
    <PreloadImages v-if="!game.imagesReady"/>
</template>

<script setup>
import { useMemoryGame } from '@/stores/game' 
import ScoreGame from '@/components/ScoreGame.vue'
import CardGame from '@/components/CardGame.vue'
import PreloadImages from '@/components/PreloadImages.vue'

const game = useMemoryGame()

game.getCards()

const flipCard = (e) => {
    if (game.enableClick) {
        const index = e.currentTarget.dataset.index
        game.cardSelected(index)
    }
}
</script>