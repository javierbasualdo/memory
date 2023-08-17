<template>
    <main class="h-screen max-w-screen-lg mx-auto grid grid-cols-1 grid-rows-1 p-5">
        <div class="grid grid-rows-6 md:gap-4">
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
</template>

<script setup>
import { useMemoryGame } from '@/stores/game' 
import ScoreGame from '@/components/ScoreGame.vue'
import CardGame from '@/components/CardGame.vue'

const game = useMemoryGame()

game.getCards()

const flipCard = (e) => {
    if (game.enableClick) {
        const index = e.currentTarget.dataset.index
        game.cardSelected(index)
    }
}
</script>