import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback } from 'react-native';
import { addCard } from '../utils/api'
import {white, black, red} from '../utils/colors'

export class AddQuestion extends Component {
  state = {
    question : '',
    answer: '',
    error: '',
    errorAnswer: ''
  }
  onAddCard = () => {
    try {
      const card = {
        question: this.state.question.trim(),
        answer: this.state.answer.trim()
      };
      if(!card.question || !card.answer){
        if (!card.question){
          this.setState({error: 'Question can not be empty.'})
        }
        if (!card.answer){
          this.setState({errorAnswer: 'Answer can not be empty.'})
        }
        return;
      }
      const { title } = this.props.navigation.state.params.deck;
      addCard(title, card)
        .then((deck)=> {
          this.setState({question: '', answer: '', error: ''});
          this.props.navigation.navigate('Deck', {deck: deck})
        })
        .catch((error) => {
          this.setState({error: error});
        })
    } catch (e) {
      alert(e)
    }
  }
  render() {
    return (
      <View style={{padding:50}}>
        <KeyboardAvoidingView>
          <View style={{padding: 10}}>
            <TextInput
              style={styles.txtInput}
              placeholder="Question"
              value = {this.state.question}
              onChangeText={(text) => this.setState({question: text, error: ''})}
              autoCapitalize={'none'}
            />
            <Text style={{color:'red'}}>{this.state.error}</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Answer"
              value = {this.state.answer}
              onChangeText={(text) => this.setState({answer: text, errorAnswer: ''})}
              autoCapitalize={'none'}
            />
            <Text style={{color:'red'}}>{this.state.errorAnswer}</Text>

            {Platform.OS !== 'ios' && (<TouchableNativeFeedback style={styles.btnSubmitAndroid}>
              <Button
                onPress={this.onAddCard}
                title="Add Card"
                />
            </TouchableNativeFeedback>)}

            {Platform.OS === 'ios' && (<TouchableOpacity style={styles.btnSubmit}>
                <Button
                  onPress={this.onAddCard}
                  title="Add Card"
                  color={white}
                />
            </TouchableOpacity>)}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  txtInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:6,
    padding:4,
    marginVertical:5
  },
  btnSubmit: {
    backgroundColor: black,
    borderRadius:6
  },
  btnSubmitAndroid: {
    backgroundColor: black,
    borderRadius:6
  }
});