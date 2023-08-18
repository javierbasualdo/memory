import { defineStore } from 'pinia'

const cardsQty = 9
const cardsTotal = cardsQty * 2

export const useMemoryGame = defineStore('game', {
    state: () => ({
        hasUser: false,
        hits: 0,
        errors: 0,
        cards: [],
        enableClick: true,
        endGame: false,
        imagesCached: {},
        imagesReady: false,
        percentage: 0
    }),
    getters: {

    },
    actions: {
        async getCards() {
            try {
                const getNewCards = await fetch(`https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${cardsQty}`)
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

                this.prepareImages()
                
            } catch (error) {
                return
            }
        },
        prepareImages() {
            let loaded = 0
        
            function getBase64Image(img) {
                
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
            
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
            
                let dataURL = canvas.toDataURL("image/jpeg");
            
                return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }

            this.cards.forEach(card => {
                const image = new Image()
                image.crossOrigin="anonymous"
                image.onload = () => {
                    const imgData = getBase64Image(image)
                    
                    this.imagesCached[card.uuid] = imgData

                    loaded++

                    this.percentage = Math.round(100 / cardsTotal * loaded)

                    if(loaded == cardsTotal) {
                        this.imagesReady = true
                    }
                }
                image.src = card.url

            })
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
                    if (!this.isGameOver()) {
                        this.enableClick = true
                    }
                } else {
                    this.errors++
                    setTimeout(() => {
                        cardsFliped.forEach(item => this.cards[item.index].show = false)
                        this.enableClick = true
                    }, 1000);
                }
            }
            
        },
        isGameOver() {
            const allFlipped = this.cards.every(card => card.show == true && card.matched == true)
    
            if (allFlipped) {
                this.endGame = true
                return true
            }

            return false
        },
        resetGame() {
            this.hits = 0
            this.errors = 0
            this.cards = []
            this.enableClick = true
            this.endGame = false
            this.imagesCached = {}
            this.imagesReady = false
            this.percentage = 0
            this.getCards()
        }
    }
})