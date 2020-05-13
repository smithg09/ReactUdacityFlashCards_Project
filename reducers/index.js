import { combineReducers } from "redux"
import {
  FETCH_DECKS,
  INSERT_DECK,
  INSERT_CARD,
  DELETE_DECK,
} from "./deck_actions";

 const decks =  ( state_change = {}, map_action) => {
    switch (map_action.type) {
        case FETCH_DECKS:
            return {
                ...state_change,
                ...map_action.decks,
            }
        case INSERT_DECK:
            const { deck } = map_action
            return {
                ...state_change,
                [deck.id]: deck
            }
        case INSERT_CARD:
            const { deckId, question } = map_action
            return {
                    ...state_change,
                    [deckId]: {
                        ...state_change[deckId],
                        cards: state_change[deckId].cards.concat(question)

                    }
                }
        case DELETE_DECK:
            const { [map_action.deckId]: _, ...others } = state_change
            return others
        default:
            return state_change
    }
}
export default combineReducers({
    decks,
})