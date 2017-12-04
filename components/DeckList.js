import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import DeckListItem from './DeckListItem'
import { getDecks } from '../utils/api'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

export class DeckList extends Component {
  state = {
    decks: []
  }
  componentWillMount() {
    getDecks().then( decks =>
      this.setState({decks: decks}), error => {
        this.setState({error: error})
      });
  }
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }
  render() {
    const { decks } = this.state;
    return (
      <View>
        <ScrollView>
        {
          Object.keys(decks).map((key) => {
            return (<DeckListItem key={key} deck={decks[key]} navigation={this.props.navigation}/>)
          })
        }
        </ScrollView>
      </View>
    );
  }
}
const styles = {
  defaultStyle: {
    borderWidth:2,
    borderColor:'#000'
  }
};