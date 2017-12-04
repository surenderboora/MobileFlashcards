import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
  } from 'react-native'
import { addDeck } from '../utils/api'
import { white } from '../utils/colors'

export class NewDeck extends Component {
  state = {
    title : '',
    error: ''
  }
  onCreateDeck = () => {
    try {
      const deckTitle = this.state.title.trim();
      if (!deckTitle){
        this.setState({error: 'Deck title can not be empty.'})
        return;
      }
      addDeck(deckTitle)
        .then(()=> {
          this.setState({title: ''});
          this.props.navigation.navigate('Deck', {deck: {'title': deckTitle, 'questions':[]}})
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
      <KeyboardAvoidingView style={{flex:1, alignItems:'stretch', justifyContent: 'center', padding:10}}>

        <Text style={{fontSize:25}}> What is the title of your new deck ? </Text>

        <TextInput
          style={{height: 40, borderWidth:1, borderColor: "#fff", paddingLeft:5}}
          placeholder="Deck Title"
          value = {this.state.title}
          onChangeText={(title) => this.setState({title: title, error: ''})}
        />
        <Text style={{color:'red'}}>{this.state.error}</Text>
        {
          Platform.OS === 'android' && (
          <TouchableNativeFeedback style={styles.androidSubmitBtn}>
            <View style={{paddingHorizontal:5}}>
              <Button
                onPress={this.onCreateDeck}
                title="Create Deck"
              />
            </View>
          </TouchableNativeFeedback>)
        }
        {
          Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.iosSubmitBtn}>
            <Button
              onPress={this.onCreateDeck}
              title="Create Deck"
              color={white}
            />
          </TouchableOpacity>)
        }
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn:{
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:40,
    marginTop: 10
  },
  androidSubmitBtn:{
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})