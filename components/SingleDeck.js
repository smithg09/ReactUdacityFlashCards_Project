import React from 'react'
import { Text, View} from 'react-native'

const SingleDeck = (props) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "normal", color: "#291541" }}>
          {props.name}
        </Text>
        <Text
          style={{
            textTransform: "uppercase",
            color: "#aca9b5",
            fontSize: 13,
            fontWeight: "bold",
            marginVertical: 5,
            letterSpacing: 1,
        }}
        >
          {props.cards ? `${props.cards.length} cards` : "No cards available"}
        </Text>
      </View>
    );
}

export default SingleDeck
