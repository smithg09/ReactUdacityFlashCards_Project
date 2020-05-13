import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { handledeleteDeckByName } from '../reducers/deck_actions'


const DeckScreen = (props) => {
    const navigation = useNavigation()
    const { decks, dispatch } = props
    const [redirect, setRedirect] = useState(null)

    useEffect(() => {
        if (redirect) {
            dispatch(handledeleteDeckByName(decks.id))
        }
    },[redirect])

    const handleDeleteEvent = () => {
        Alert.alert(
            'Delete Deck',
            'Are you sure you would like to delete this deck?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'

                },
                {
                    text: 'Delete',
                    onPress: () => {
                        setRedirect(true)
                    }
                }
            ],
            { cancelable: false }
        )
    }
    if(redirect) {
        navigation.navigate('LandingScreen')
        return null
    }
    return (
      <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 30  }}>
        <View
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.deckName}>{props.decks.name}</Text>
          <Text
            style={{
              textTransform: "uppercase",
              color: "#aca9b5",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginVertical: 10
            }}
          >
            {`${props.decks.cards.length} cards`}
          </Text>
        </View>
        <View style={{ width: '100%', marginVertical: 20}}>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={styles.custombtn}
              onPress={() =>
                navigation.navigate("AddCardScreen", {
                    deckId: decks.id,
                    name: decks.name,
                })
            }
            >
                <Text style={styles.btnText}> Add Card </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.custombtn}
              onPress={() =>
                navigation.navigate("QuizScreen", {
                    name: decks.name,
                    deckId: decks.id,
                })
            }
            >
                <Text style={styles.btnText}> Start Quiz </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100, justifyContent: "flex-end" }}>
            <TouchableOpacity  
                style={[styles.custombtn,{ backgroundColor: '#d8484866'}]}
                onPress={handleDeleteEvent}> 
                <Text style={[styles.btnText,{ color: '#d84848' }]}> Delete Deck </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    deckName: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#291541",
    },
    custombtn: {
        backgroundColor: "#e6e3f4",
        borderColor: "transparent",
        width: "100%",
        borderRadius: 5,
        padding: 10,
        paddingVertical: 12
    },
    btnText: {
        color: "#61309d",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const mapStateToProps = ({ decks }, props) => {
    const { deckId } = props.route.params
    const deck = Object.keys(decks).filter((d) => {
        return decks[d].id === deckId
    })
    return {
        decks: !deck
            ? null
            : decks[deck]
    }
}

export default connect(mapStateToProps)(DeckScreen)
