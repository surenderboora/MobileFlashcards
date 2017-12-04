import React, { Component } from 'react';
import { View, Text, Button, StyleSheet,
TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { green, red, white } from '../utils/colors';
import { clearTodaysLocalNotification } from '../utils/helpers'

export class Quiz extends Component {
  state = {
    currentQuestion: 0,
    quizCompleted: false,
    score: 0,
    isAnswerDisplayed: false
  }
  onCorrectAnswer = () => {
    const { questions } = this.props.navigation.state.params.deck;
    this.setState((prevState)=> {
      const questionIndex = prevState.currentQuestion;
      let quizCompleted = prevState.quizCompleted;
      if (prevState.currentQuestion + 1 === questions.length) {
        quizCompleted = true;
        clearTodaysLocalNotification();
      }
      return {
        score: prevState.score + 1,
        currentQuestion: prevState.currentQuestion + 1,
        quizCompleted: quizCompleted,
        isAnswerDisplayed: false
      }
    });
  }
  onInCorrectAnswer = () => {
    const { questions } = this.props.navigation.state.params.deck;
    this.setState((prevState)=> {
      const questionIndex = prevState.currentQuestion;
      let quizCompleted = prevState.quizCompleted;
      if (prevState.currentQuestion + 1 === questions.length) {
        quizCompleted = true;
        // Update number of quizzes completed for the day
      }
      return {
        // score: prevState.score,
        currentQuestion: prevState.currentQuestion + 1,
        quizCompleted: quizCompleted,
        isAnswerDisplayed: false
      }
    });
  }
  onRestartQuizPress = () => {
    this.setState({
      currentQuestion: 0,
      quizCompleted: false,
      score: 0
    })
  }
  onBackToDeckPress = () => {
    // TODO: navigate to deck. use path on the route to link if there is no other way
    this.props.navigation.goBack()
  }
  onShowAnswer= ()=>{
    this.setState({
      isAnswerDisplayed: true
    })
  }
  render() {
    const { currentQuestion, quizCompleted, score, isAnswerDisplayed } = this.state;
    const { questions } = this.props.navigation.state.params.deck;
    if (quizCompleted) {
      return (
        <View style={{flex:1, alignItems: 'stretch'}}>
          <View style={{flex:4, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:25}}>You scored <Text style={{'color':'green', fontWeight:'bold'}}>{((score * 100) /questions.length).toFixed(0)}%.</Text></Text>
          </View>
          <View style={{flex:1}}>
            <View style={{paddingHorizontal:50, paddingBottom:10}}>
              <Button onPress={this.onRestartQuizPress} title="Restart Quiz"></Button>
            </View>
            <View style={{paddingHorizontal:50}}>
              <Button onPress={this.onBackToDeckPress} title="Back to Deck"></Button>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <View style={{height:60}}>
          <Text style={{fontSize:25}}> {currentQuestion + 1} / {questions.length} </Text>
        </View>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize:25}}>{questions[currentQuestion]['question']}</Text>
          {isAnswerDisplayed ?
            <View style={{paddingVertical:30}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:25, color:"green"}}>{questions[currentQuestion]['answer']}</Text>
              </View>
              {Platform.OS === 'android' && (
                <View style={{alignItems: 'stretch', justifyContent: 'center', paddingVertical:50}}>
                  <TouchableNativeFeedback style={styles.btnCorrectAnswer}>
                    <View style={{paddingHorizontal:50, paddingBottom:10}}>
                      <Button
                        onPress={this.onCorrectAnswer}
                        title="Correct"
                      ></Button>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback style={styles.btnInCorrectAnswer}>
                    <View style={{paddingHorizontal:50}}>
                      <Button
                        onPress={this.onInCorrectAnswer}
                        title="Incorrect"
                      ></Button>
                    </View>
                  </TouchableNativeFeedback>
                </View>)
              }
              {Platform.OS === 'ios' && (
                <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical:50}}>
                  <TouchableOpacity style={styles.btnCorrectAnswer}>
                      <Button
                        onPress={this.onCorrectAnswer}
                        title="Correct"
                        color={white}
                      ></Button>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnInCorrectAnswer}>
                    <Button
                      onPress={this.onInCorrectAnswer}
                      title="Incorrect"
                      color={white}
                    ></Button>
                  </TouchableOpacity>
                </View>)
              }
            </View>
            : <Button onPress={this.onShowAnswer} title="Show Answer"></Button>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    btnCorrectAnswer:{
        backgroundColor: green,
        borderWidth: 1,
        borderColor: green,
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:40,
        width:200,
        justifyContent: 'center'
    },
    btnInCorrectAnswer:{
        backgroundColor: red,
        borderWidth: 1,
        borderColor: red,
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:40,
        marginTop: 10,
        width:200,
        justifyContent: 'center'
    }
})
