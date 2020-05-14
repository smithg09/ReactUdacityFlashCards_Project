import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import DeckList from '../components/DeckList';
import { connect } from 'react-redux';
import { initial_state } from '../reducers/deck_actions';
import { clearLocalNotification , setLocalNotification } from '../utils/notificationHandler'
import FadeAnimContainer from '../utils/FadeAnim';

class LandingScreen extends React.Component {
    componentDidMount() {
      clearLocalNotification().then(setLocalNotification);
      const { dispatch } = this.props
      dispatch(initial_state())
        
    }
    render() {
        const { navigation } = this.props
        return (
          <FadeAnimContainer style={{ flex: 1 , backgroundColor: '#fff'}}>
            <View style={{ padding: 10, backgroundColor: "#fff" }}>
              <Text style={{ textTransform: 'uppercase', color: '#aca9b5',fontSize: 12,fontWeight: 'bold',letterSpacing: 2, }}>Welcome</Text>
              <Text style={styles.text}>Expore Decks</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                backgroundColor: "#fff",
                justifyContent: "space-around",
              }}
            >
              <DeckList />
              <TouchableOpacity
                style={styles.createbtn}
                onPress={() => navigation.navigate("AddDeckScreen")}
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
                  Create Deck{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </FadeAnimContainer>
        );
    }
    
}
const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#291541",
  },
  createbtn: {
    backgroundColor: "#291541",
    borderColor: "transparent",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: "#61309d",
  },
});

export default connect()(LandingScreen)
