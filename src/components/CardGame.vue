<template>
    <div class="card group h-full w-full [perspective:1000px]">
        <div 
            :class="[`card__container relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]`, props.info.show ? `[transform:rotateY(180deg)]` : ``]"
        >
            <div class="card__back absolute flex justify-center items-center inset-0 h-full w-full rounded-xl px-12 text-slate-200">
                <span class="font-['Anton'] text-4xl md:text-8xl text-orange-900/60">?</span>
            </div>
            <div class="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <img 
                    v-if="props.info.show"
                    class="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" 
                    :src="props.info.url" 
                    alt="" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    info: { type: Object, required: true },
})
</script>

<style scoped>
.card {
    cursor: pointer;
}
.card__back {
    background-image: url('@/assets/piece-background.png');
    background-size: 114% 114%;
    background-position: center;
}
</style>