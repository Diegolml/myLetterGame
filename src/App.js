import React, { Component } from 'react';
import './App.css';
import { board } from './boards/test-board-2.json';
import { words } from './boards/dictionary.json';
import Keyboard from './components/board';
import LetterKeyboard from './components/letterKeyboard';
import ClearButton from './components/clearButton';
import TextBox from './components/textBox';

export default class LetterGame extends Component {
  constructor(props) {
    super(props);
    this.dictionary = {};
    const _this = this;
    words.forEach(word => {
      _this.dictionary[word] = word;
    });
    this.myWordStore = { word: [], board: {}, wordSuccess: false };
    board.forEach((letter, index) => {
      this.myWordStore.board[letter + index] = { pressed: false };
    });
    this.myWord = "";
  }

  componentDidMount = () => {
    const { clearButton, textBox } = this.refs;
    this.clearButton = clearButton;
    this.textBox = textBox;
  }

  buildWord = (wordArray) => {
    const _this = this;
    this.myWord = "";
    wordArray.forEach(obj => {
      _this.myWord += obj.letter;
    })
    this.textBox.setWord(this.myWord);
  }

  wordEvaluation = () => {
    if (this.dictionary.hasOwnProperty(this.myWord.toLowerCase())){
      this.textBox.setValidClass("valid");
      this.myWordStore.wordSuccess = true;
      for (const key in this.myWordStore.board) {
        if (this.myWordStore.board[key].pressed){
          this.refs[key].setColor("letter-success");
        }
      }
    } else if (this.myWordStore.wordSuccess) {
      this.myWordStore.wordSuccess = false;
      this.textBox.setValidClass("");
      for (const key in this.myWordStore.board) {
        if (this.myWordStore.board[key].pressed){
          this.refs[key].setColor("letter-error");
        }
      }
    }
  }

  writeWord = (letter, index) => {
    if (this.myWordStore.board[`${letter}${index}`].pressed) {
      this.myWordStore.board[letter + index].pressed = false;
      this.refs[letter + index].setColor("");
      this.myWordStore.word.splice(this.myWordStore.word.findIndex(obj => { return obj.index === index }), 1);
      this.buildWord(this.myWordStore.word);
      this.wordEvaluation();
      if (this.myWordStore.word.length === 0) {
        this.clearWord();
      }
      return;
    } else if (this.myWordStore.word.length === 6) {
      return;
    }
    this.myWordStore.word.push({ letter: letter, index: index });
    this.buildWord(this.myWordStore.word);
    this.clearButton.setVisible(true);
    this.myWordStore.board[`${letter}${index}`]["pressed"] = true;
    this.refs[`${letter}${index}`].setColor('letter-error');
    this.wordEvaluation();
  }

  clearWord = () => {
    this.myWordStore.word = [];
    this.textBox.setWord("");
    this.clearButton.setVisible(false);
    this.textBox.setValidClass("invalid");
    for (const key in this.myWordStore.board) {
      if (this.myWordStore.board[key]) {
        this.myWordStore.board[key].pressed = false;
        this.refs[key].setColor("");
      }
    }
  }

  render() {
    return (
      <div className="app-container">
        <ClearButton ref="clearButton" visible={false} onClick={this.clearWord} />
        <Keyboard>
          {board.map((letter, index) => {
            return (
              <LetterKeyboard ref={`${letter}${index}`} letter={letter} className="board-letter" onClick={() => { this.writeWord(letter, index) }} />
            )
          })}
        </Keyboard>
        <TextBox ref="textBox" />
      </div>
    );
  }
}
