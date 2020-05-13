import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import { connect } from 'react-redux'
import { handleSaveDeck } from '../reducers/deck_actions'

const AddDeckScreen = (props) => {
    const [name, setName] = useState("")
    const { navigation } = props

    const submitHandler = () => {
        const DeckName = !name ? "Untitled Deck" : name
        props.dispatch(handleSaveDeck(DeckName))
            .then((deck) => {
                navigation.navigate('DeckScreen', {
                    deckId: deck.id,
                    name: deck.name
                })
            })
    }

    return (
      <View style={styles.CreateCardContainer}>
        <View>
          <Text style={styles.text}>
            What name would you like to have for this deck?
          </Text>
          <TextInput
            style={styles.Input}
            onChangeText={(Name) => setName(Name)}
            value={name}
            placeholder="Enter Deck Name"
          />
        </View>
        <TouchableOpacity
          style={styles.createbtn}
          onPress={submitHandler}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#e6e3f4",
              fontSize: 20,
            }}
          >
            {" "}
            Create {" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  CreateCardContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    flex: 1,
  },
  Input: {
    borderColor: 'transparent',
    backgroundColor: '#eeeefae3',
    padding: 10,
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    marginBottom: 90
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#291541",
    marginVertical: 40,
  },
  createbtn: {
    backgroundColor: "#291541",
    borderColor: "transparent",
    borderRadius: 5,
    padding: 10,
    color: "#61309d",
  },
});

export default connect()(AddDeckScreen)
