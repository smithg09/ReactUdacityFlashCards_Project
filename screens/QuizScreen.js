import React, { useState, useEffect } from 'react'
import { Text, View, Alert, StyleSheet , TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'



const QuizScreen = (props) => {
    const deck = props.decks
    const { navigation } = props
    const [allCards, setAllCards] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [activeCard, setactiveCard] = useState(null)
    const [revealAnswer, setrevealAnswer] = useState(false)

    const returnCard = () => {
        let r = Math.floor(Math.random() * deck.cards.length)
        while (allCards.includes(r)) {
            r = Math.floor(Math.random() * deck.cards.length)
        }
        setactiveCard(r)
    }

    const ShowAnswerHandler = (answer) => {
        setrevealAnswer(answer)
    }
    const handleAnswer = (bool) => {
        if(bool && allCards.length < deck.cards.length) {
            setCorrectAnswers(correctAnswers + 1)
        }
        setrevealAnswer(false)
        setAllCards(allCards => [...allCards, activeCard])
    }
    const RestartHandler = () => {
        Alert.alert(
            'Restart Quiz',
            'Are you sure you would like to restart the quiz? All the current progress will be lost forever.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'

                },
                {
                    text: 'Restart',
                    onPress: () => {
                        setCorrectAnswers(0)
                        setactiveCard(null)
                        setrevealAnswer(false)
                        setAllCards([])
                    }
                }
            ],
            { cancelable: false }
        )
    }
    useEffect(() => {
        if(allCards.length < deck.cards.length) {
            returnCard()
        }
    }, [allCards])
    
    return (
      <View style={styles.quizwrapper}>
        {!deck.cards.length ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 200,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#777",
                textTransform: "uppercase",
                color: "#aca9b5",
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 2,
                marginVertical: 30,
                lineHeight: 28,
              }}
            >
              Sorry, you cannot take this quiz due to no cards are added into
              this deck
            </Text>
          </View>
        ) : allCards.length >= deck.cards.length ? (
          <View style={styles.quizcontainer}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {`${((correctAnswers / deck.cards.length) * 100).toFixed(2)}%`}
            </Text>
            <Text
              style={{
                textAlign: "center",
                textAlign: "center",
                fontSize: 20,
                color: "#777",
                textTransform: "uppercase",
                color: "#aca9b5",
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 2,
                marginVertical: 20,
                lineHeight: 28,
              }}
            >
              {(correctAnswers / deck.cards.length) * 100 > 80
                ? "Great job you scored more than 80%"
                : "Sorry You scored less than 80%, Try again!"}
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            {activeCard !== null ? (
              <View style={{ alignItems: "center" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View style={styles.questionwrapper}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        color: "#777",
                        textTransform: "uppercase",
                        color: "#aca9b5",
                        fontSize: 14,
                        fontWeight: "bold",
                        letterSpacing: 2,
                        marginBottom: 10,
                      }}
                    >
                      {" "}
                      Question{" "}
                    </Text>
                    <Text style={{ fontSize: 20 }}>
                      {deck.cards[activeCard].question}
                    </Text>
                  </View>
                  {revealAnswer ? (
                    <View style={{ padding: 40, alignItems: "center" }}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: "#777",
                          textTransform: "uppercase",
                          color: "#aca9b5",
                          fontSize: 14,
                          fontWeight: "bold",
                          letterSpacing: 2,
                          marginBottom: 10,
                        }}
                      >
                        {" "}
                        Answer{" "}
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {deck.cards[activeCard].answer}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ padding: 40, alignItems: "center" }}>
                      <Text style={{ fontSize: 20 }}>
                        Tap ' Show Answer button ' to reveal{" "}
                      </Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.custombtn}
                  onPress={() => ShowAnswerHandler(true)}
                >
                  <Text style={styles.btnText}> Show Answer </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#777",
                    textTransform: "uppercase",
                    color: "#aca9b5",
                    fontSize: 14,
                    fontWeight: "bold",
                    letterSpacing: 2,
                    marginTop: 10,
                    lineHeight: 28,
                  }}
                >{`${
                  deck.cards.length - allCards.length
                } questions remaining`}</Text>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handleAnswer(true)}
                style={{ margin: 20 }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../assets/check.png")}
                    style={[styles.icon, { tintColor: "#45b489" }]}
                  />
                  <Text>Correct</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAnswer(false)}
                style={{ margin: 20 }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../assets/x.png")}
                    style={[styles.icon, { tintColor: "#d84848" }]}
                  />
                  <Text>Incorrect</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "column",
            width: 300,
            justifyContent: "space-between",
            paddingTop: 60,
          }}
        >
          <TouchableOpacity
            style={styles.custombtn}
            onPress={() => RestartHandler()}
          >
            <Text style={styles.btnText}> Restart Quiz </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.custombtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}> Back to Deck </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  quizwrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  questionwrapper: {
        flex: 1,
        justifyContent:"center",
        backgroundColor: "#fff",
        width: '100%',
        padding: 40,
        borderRadius: 5,
        alignItems: 'center'
    },
  text: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#291541",
    marginBottom: 20,
  },
  quizcontainer: {
    alignItems: "center",
    width: 200,
  },
  custombtn: {
    backgroundColor: "#e6e3f4",
    borderColor: "transparent",
    width: "100%",
    borderRadius: 5,
    padding: 10,
    paddingVertical: 12,
    marginVertical: 5,
  },
  btnText: {
    color: "#61309d",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
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

export default connect(mapStateToProps)(QuizScreen)
