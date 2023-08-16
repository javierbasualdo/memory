<template>
    <main class="h-screen max-w-screen-lg mx-auto grid grid-cols-1 grid-rows-1 p-5">
        <div class="grid grid-rows-6">
            <section class="row-span-1 grid place-content-center">
                <ScoreGame/>
            </section>
            <section class="row-span-5 grid grid-cols-3 grid-rows-6 gap-2 md:grid-cols-6 md:grid-rows-3 md:gap-4">cards</section>
        </div>
    </main>
</template>

<script setup>
import ScoreGame from '@/components/ScoreGame.vue'
</script>