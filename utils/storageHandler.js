import { AsyncStorage } from 'react-native'

export const InitialLoadHandler = async () => {
    const keys = await AsyncStorage.getAllKeys()
    const stores = await AsyncStorage.multiGet(keys, (stores) => {
        return stores
    })
    const decks = {}
    stores.forEach((store) => {
        debugger;
            const values = JSON.parse(store[1])
            const deck = {
                id: values.id,
                name: values.name,
                cards: values.cards
            }
            decks[values.id] = deck
    })
    return decks
}

export const saveDeck = async (deck_name) => {
    const deck_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const deck = {
        id : deck_id,
        name: deck_name,
        cards: [],
    }
    AsyncStorage.setItem(deck_id, JSON.stringify(deck))
    return deck
}


export const addCardToDeck = async (deckId, question) => {

    const store = await AsyncStorage.getItem(deckId)

    const deck = JSON.parse(store)
    deck.cards.push(question)

    AsyncStorage.setItem(deck.id, JSON.stringify(deck))

    return deck
}


export const deleteDeckById = async (deckId) => {
    return AsyncStorage.removeItem(deckId)
}