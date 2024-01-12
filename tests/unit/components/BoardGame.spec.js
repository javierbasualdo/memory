import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import { useMemoryGame } from '@/stores/game'
import BoardGame from '@/components/BoardGame.vue'
import PreloadImages from '@/components/PreloadImages.vue'

describe('BoardGame Component', () => {

    const wrapper = mount(BoardGame, {
        global: {
            plugins: [createTestingPinia()],
        },
    })

    const game = useMemoryGame()

    test('Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Check Main tailwind classes', () => {
        const main = wrapper.find('main')
        expect(main.classes().join(' ')).toContain('h-[calc(100dvh)] max-w-screen-lg mx-auto grid grid-cols-1 grid-rows-1 p-5')
    })

    test('Verify PreloadImages Component', () => {
        expect(wrapper.findComponent(PreloadImages).exists()).toBe(true)
    })

    test('Verify cards empty', async () => {
        expect(game.imagesReady).toBeFalsy
        game.getCards()
    })

    test('Verify cards no empty', async () => {
        expect(game.imagesReady).toBeTruthy
    })

})