import { defineStore } from 'pinia'

export const useMemoryGame = defineStore('game', {
    state: () => ({
        hasUser: false,
        hits: 0,
        errors: 0,
        cards: [],
        cardsQty: 9,
        enableClick: true
    }),
    getters: {

    },
    actions: {
        async getCards() {
            try {
                const getNewCards = await fetch(`https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${this.cardsQty}`)
                const newCards = await getNewCards.json()
                const cardsInfo = []
                
                newCards.entries.forEach((element) => {
                    element.fields.image.show = false
                    element.fields.image.matched = false
                    const clone = structuredClone(element)
                    cardsInfo.push(element.fields.image, clone.fields.image)
                })
                
                cardsInfo.sort(() => Math.random() - 0.5)

                this.cards = cardsInfo
                
            } catch (error) {
                return
            }
        },
        cardSelected(index) {
            this.cards[index].show = true
            this.compareCardsSelected()
        },
        compareCardsSelected() {
            const cardsFliped = this.cards.reduce((acc, card, i) => { 
                if (card.show == true && card.matched == false) 
                    acc.push({ index: i, card })
                return acc
            }, [])
            
            if (cardsFliped.length == 2) {
                this.enableClick = false

                if (cardsFliped[0].card.uuid == cardsFliped[1].card.uuid) {
                    this.hits++
                    cardsFliped.forEach(item => this.cards[item.index].matched = true)
                    this.enableClick = true
                } else {
                    this.errors++
                    setTimeout(() => {
                        cardsFliped.forEach(item => this.cards[item.index].show = false)
                        this.enableClick = true
                    }, 1000);
                }
            }
            
        }
    }
})