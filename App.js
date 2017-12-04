import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { DeckList } from './components/DeckList';
import { NewDeck } from './components/NewDeck';
import Deck  from './components/Deck';
import { AddQuestion } from './components/AddQuestion';
import { Quiz } from './components/Quiz';
import { TabNavigator, StackNavigator } from 'react-navigation';


const DeckNavigator = StackNavigator({
  Deck: {
    screen: Deck,
    // path:'deck/:title',
    navigationOptions: {
      title: 'Back',
    }
  },
  AddQuestion: {
    screen: AddQuestion
  },
  Quiz: {
    screen: Quiz
  }
})

const DeckListNavigator = StackNavigator({
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck,
    // path:'deck/:title',
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deck.title}`,
      tabBarVisible: false
    })
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add New Card',
      tabBarVisible: false
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      tabBarVisible: false
    }
  }
}, {
  swipeEnabled:false
})

const AppNavigator = TabNavigator({
  Decks: {
    screen: DeckListNavigator
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: "New Deck"
    }
  },
}, {
  tabBarOptions:{
    labelStyle: {
      fontSize: 18,
    }
  }
});

export default class App extends React.Component {
  render() {
    const decks = this.state;
    return (
        <AppNavigator/>
      );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderWidth:2,
    borderColor:'#000'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // vertical alignment
    justifyContent: 'center', // horizontal alignment
    flexDirection:'column',
    paddingHorizontal:0,
  },
  deckListContainer: {
    paddingVertical: 50,
    flexDirection: 'column',
    alignItems:'stretch',
    width:'100%',
  }
});
