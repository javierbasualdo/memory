import { defineStore } from 'pinia'

export const useMemoryGame = defineStore('game', {
    state: () => ({
        hasUser: false,
        hits: 0,
        errors: 0
    }),
    getters: {

    },
    actions: {

    }
})