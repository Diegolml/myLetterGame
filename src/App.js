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
    this.myWordHash = { word: [], board: {}, wordSuccess: false };
    board.forEach((letter, index) => {
      this.myWordHash.board[letter + index] = { pressed: false };
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
      this.myWordHash.wordSuccess = true;
      for (const key in this.myWordHash.board) {
        if (this.myWordHash.board[key].pressed){
          this.refs[key].setColor("letter-success");
        }
      }
    } else if (this.myWordHash.wordSuccess) {
      this.myWordHash.wordSuccess = false;
      this.textBox.setValidClass("");
      for (const key in this.myWordHash.board) {
        if (this.myWordHash.board[key].pressed){
          this.refs[key].setColor("letter-error");
        }
      }
    }
  }

  writeWord = (letter, index) => {
    if (this.myWordHash.board[`${letter}${index}`].pressed) {
      this.myWordHash.board[letter + index].pressed = false;
      this.refs[letter + index].setColor("");
      this.myWordHash.word.splice(this.myWordHash.word.findIndex(obj => { return obj.index === index }), 1);
      this.buildWord(this.myWordHash.word);
      this.wordEvaluation();
      return;
    } else if (this.myWordHash.word.length === 6) {
      return;
    }
    this.myWordHash.word.push({ letter: letter, index: index });
    this.buildWord(this.myWordHash.word);
    this.clearButton.setVisible(true);
    this.myWordHash.board[`${letter}${index}`]["pressed"] = true;
    this.refs[`${letter}${index}`].setColor('letter-error');
    this.wordEvaluation();
  }

  clearWord = () => {
    this.myWordHash.word = [];
    this.textBox.setWord("");
    this.clearButton.setVisible(false);
    this.textBox.setValidClass("invalid");
    for (const key in this.myWordHash.board) {
      if (this.myWordHash.board[key]) {
        this.myWordHash.board[key].pressed = false;
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
