import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DeckListItem extends Component {
  render() {
    const { deck, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Deck', { deck: deck })}
        title= {deck.title}>
        <View style={styles.deckItem}>
          <Text style={{fontSize: 40}}> {deck.title} </Text>
          <Text style={{fontSize: 25}}> {deck.questions.length} cards </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  deckItem: {
    height:180,
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor: '#000'
  }
})
export default DeckListItem;