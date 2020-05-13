import { InitialLoadHandler, saveDeck, addCardToDeck, deleteDeckById } from '../utils/storageHandler'

export const FETCH_DECKS = 'FETCH_DECKS'
export const INSERT_DECK = 'INSERT_DECK'
export const INSERT_CARD = 'INSERT_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function fetchDecks (decks) {
    return {
        type: FETCH_DECKS,
        decks,
    }
}

export function insertDeck (deck) {
    return {
        type: INSERT_DECK,
        deck,
    }
}

export function addCard (deckId, question) {
    return {
        type: INSERT_CARD,
        deckId,
        question
    }
}

export function deleteDeckByName (deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function initial_state() {
    return (dispatch) => {
        return(
            InitialLoadHandler()
            .then((decks) => {
                dispatch(fetchDecks(decks))
            })
        )
    }
}

export function handleSaveDeck(deck) {
    return (dispatch) => {
        return(
            saveDeck(deck)
                .then((d) => {
                    dispatch(insertDeck(d))
                    return d
                })
        )
    }
}

export function handleAddCard(deckId, question) {
    return (dispatch) => {
        return(
            addCardToDeck(deckId, question)
                .then(() => {
                    dispatch(addCard(deckId, question))
                })
        )
    }

}

export function handledeleteDeckByName(deckId) {
    return (dispatch) => {
        return(
            deleteDeckById(deckId)
                .then(() => {
                    dispatch(deleteDeckByName(deckId))
                })
        )
    }
}