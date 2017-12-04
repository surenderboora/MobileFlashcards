import React, { Component } from 'react';
import { StyleSheet, View, Text, Button,
  Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import {white, black, red} from '../utils/colors'

class Deck extends Component {
  onPressAddCard = () => {
    const { deck } = this.props.navigation.state.params;
    this.props.navigation.navigate('AddQuestion', {deck: deck})
  }
  onPressStartQuiz = () => {
    const { deck } = this.props.navigation.state.params;
    this.props.navigation.navigate('Quiz', {deck: deck})
  }
  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View style={{flex: 1}}>
        <View style={{flex:2 ,alignItems: 'center', justifyContent:'center'}}>
          <Text style={{fontSize: 50}}> {deck.title} </Text>
          <Text style={{fontSize: 30}}> {deck.questions.length} cards </Text>
        </View>
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          {Platform.OS === 'android' && <TouchableNativeFeedback style={styles.androidAddCardBtn}>
            <View style={{paddingBottom:10, paddingHorizontal:50}}>
            <Button
              onPress={this.onPressAddCard}
              title="Add Card"
            />
            </View>
          </TouchableNativeFeedback>}

          {Platform.OS === 'android' && (<TouchableNativeFeedback style={styles.androidStartQuizBtn}>
            <View style={{paddingHorizontal:50}}>
            <Button
              onPress={this.onPressStartQuiz}
              title="Start Quiz"
              disabled={deck.questions.length === 0}
            />
            </View>
          </TouchableNativeFeedback>)}
          {Platform.OS === 'ios' && <TouchableOpacity style={styles.iosAddCardBtn}>
            <Button
              onPress={this.onPressAddCard}
              title="Add Card"
              color={black}
            />
          </TouchableOpacity>}
          {Platform.OS === 'ios' && (<TouchableOpacity style={styles.iosStartQuizBtn}>
            <Button
              onPress={this.onPressStartQuiz}
              title="Start Quiz"
              color={white}
              disabled={deck.questions.length === 0}
            />
          </TouchableOpacity>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  androidAddCardBtn:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:40,
    marginHorizontal:50
  },
  androidStartQuizBtn:{
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:40,
    marginTop: 10,
    marginHorizontal:50
  },
  iosAddCardBtn:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:40,
    marginHorizontal:50
  },
  iosStartQuizBtn:{
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:40,
    marginTop: 10,
    marginHorizontal:50
  }
})

export default Deck;