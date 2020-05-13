import React from 'react'
import { Text , Image, View, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import SingleDeck from './SingleDeck'
import { useNavigation } from '@react-navigation/native'

const DeckList = (props) => {
    const { decks } = props
    const navigation = useNavigation()
    return (
        <ScrollView>
            {decks
                ? Object.keys(decks).map((deck_item) => {
                    return <DecksItems
                        key={decks[deck_item].id} onPress={() => navigation.navigate('DeckScreen', {
                                deckId: decks[deck_item].id,
                                name: decks[deck_item].name
                            })}>
                                <SingleDeck
                                    id={decks[deck_item].id}
                                    name={decks[deck_item].name}
                                    cards={decks[deck_item].cards}
                                />
                            </DecksItems>
                })
                : (
                    <View style={{ paddingVertical: 30}}>
                    <Image source={require('../assets/notfound.png')}
                            style={{
                                alignSelf: 'center',
                                width: 300,
                                height: 300
                            }}
                        resizeMode='contain' />
                        <Text style={{ textAlign: 'center', textTransform: 'uppercase', color: '#aca9b5',fontSize: 15,fontWeight: 'bold',letterSpacing: 2, }}>Start by creating a new deck</Text>
                    </View>
                    
                    )}
        </ScrollView>
    )
}


const DecksItems = styled.TouchableOpacity`
  background: #e6e3f0;
  border: 2px solid #ddd;
  border-radius: 7px;
  padding: 15px;
  align-self: center;
  width: 90%;
  margin: 5px 30px;
`;

function mapStateToProps ({decks}) {
    return {
        decks: Object.keys(decks).length > 0
            ? decks
            : null
    }
}

export default connect(mapStateToProps)(DeckList)
