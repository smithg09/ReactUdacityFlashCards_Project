import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LandingScreen from "../screens/LandingScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import DeckScreen from "../screens/DeckScreen";
import AddCardScreen from "../screens/AddCardScreen";
import QuizScreen from "../screens/QuizScreen";

const Stack = createStackNavigator();


export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{
              title: "Flashify",
            }}
          />
          <Stack.Screen name="AddDeckScreen" component={AddDeckScreen} options={{ title: "Create New Deck"}}/>
          <Stack.Screen
            name="DeckScreen"
            component={DeckScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="AddCardScreen"
            component={AddCardScreen}
            options={{
              title: "Add Card",
            }}
          />
          <Stack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={({ route }) => ({ title: `${route.params.name} quiz` })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}