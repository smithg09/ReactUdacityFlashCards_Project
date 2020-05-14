import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Navigation from './components/Navigation';
import { setLocalNotification } from "./utils/notificationHandler";

const loggerEvent = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action: ", action);
  const returnValue = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return returnValue;
};

const middlewares = applyMiddleware(thunk, loggerEvent);
// Starting Point of the Application.
export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return(
      <Provider store={createStore(reducer, middlewares)}>
        <StatusBar barStyle="light-content" backgroundColor="#291541" />
         <Navigation />
      </Provider>
    );
  }
}
