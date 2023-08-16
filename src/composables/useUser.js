import { useMemoryGame } from '@/stores/game'

export default function useUser() {

    const game = useMemoryGame()

    const USER_STORAGE = 'memory_user'

    const getUser = () => {
        return JSON.parse(localStorage.getItem(USER_STORAGE))
    }

    const setUser = (name) => {
        const userModel = {
            userName: name
        }

        localStorage.setItem(USER_STORAGE, JSON.stringify(userModel))
        game.hasUser = true
    }

    const hasUser = () => {
        game.hasUser = localStorage.getItem(USER_STORAGE) ? true : false
    }

    return {
        getUser,
        setUser,
        hasUser,
    }
}