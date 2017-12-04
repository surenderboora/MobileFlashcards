import { AsyncStorage } from 'react-native';
const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  JQuery: {
    title: 'JQuery',
    questions: [
      {
        question: 'What is a JQuery?',
        answer: 'It is a library used for accessing and manipulating DOM.'
      }
    ]
  }
};

export function initApp() {
  AsyncStorage.setItem('deckList', JSON.stringify(initialState));
}

export function getDecks() {
  return AsyncStorage.getItem('deckList')
    .then(deckList => {
      if(!deckList) {
        initApp();
        return initialState;
      }
      return JSON.parse(deckList)
    });
}

export function addDeck(deckTitle) {
  return AsyncStorage.getItem('deckList')
    .then(deckList => {
      deckList = JSON.parse(deckList);
      if (deckList[deckTitle])
        throw "Deck with name "+ deckTitle + " already exists."
      deckList[deckTitle] = { title: deckTitle, questions: [] };
      AsyncStorage.setItem('deckList', JSON.stringify(deckList));
    });
}

export function addCard(deckTitle, card) {
  return AsyncStorage.getItem('deckList')
    .then(deckList => {
      deckList = JSON.parse(deckList);
      // Add validation to check if the same question is already added ?
      if (deckList[deckTitle]['questions'].filter((q) => q.question === card.question).length > 0)
        throw "Deck "+ deckTitle + " already contains this question."
      deckList[deckTitle]['questions'].push(card);
      AsyncStorage.setItem('deckList', JSON.stringify(deckList));
      return deckList[deckTitle];
    });
}

