import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { handleAddCard } from '../reducers/deck_actions'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


const AddCardScreen = (props) => {
    const { deckId, name } = props.route.params
    const { dispatch } = props
    const navigation = useNavigation()

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const submitHandler = () => {
      let error = false;
      if (question === undefined || question.length < 1) {
        error = true;
      }
      if (!error) {
        const CardSet = {
          question,
          answer,
        };
        dispatch(handleAddCard(deckId, CardSet));
        navigation.goBack();
      } else {
        alert("You must atleast enter question!");
      }
    };

    return (
      <View style={styles.addcardwrapper}>
        <Text style={styles.text}>{name}</Text>
        <View style={{ paddingVertical: 20, width: "100%" }}>
          <TextInput
            style={[styles.Input , { marginVertical: 20 }]}
            onChangeText={(text) => setQuestion(text)}
            value={question}
            placeholder="What is your question?"
          />
          <TextInput
            style={[styles.Input ,{ marginVertical: 10 }]}
            onChangeText={(text) => setAnswer(text)}
            value={answer}
            placeholder="What is the answer?"
          />
          <TouchableOpacity style={styles.createbtn} onPress={submitHandler}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#e6e3f4",
                fontSize: 20,
              }}
            >
              {" "}
              Add Card{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#291541",
  },
  Input: {
    borderColor: 'transparent',
    backgroundColor: '#eeeefae3',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    fontSize: 20,
    height: 50
  },
  createbtn: {
    backgroundColor: "#291541",
    borderColor: "transparent",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: "#61309d",
  },
  addcardwrapper: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  createbtn: {
    backgroundColor: "#291541",
    borderColor: "transparent",
    borderRadius: 5,
    padding: 10,
    marginVertical: 80,
    color: "#61309d",
  },
});

export default connect()(AddCardScreen)
