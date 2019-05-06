import React, { Component } from 'react';

export default class LetterKeyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorClass: "",
            pressed: false
        };
        this.letter = props.letter;
        this.className = props.className;
        this.onClick = props.onClick;
      }

    setPressed = (bool) => {
        this.setState({ pressed: bool });
    }

    setColor = (color) => {
        this.setState({colorClass: color})
    }

    isPressed = () => {
        return this.state.pressed;
    }

    render() {
        return (
            <div onClick={this.onClick} className={`${this.className} ${this.state.colorClass}`}>{this.letter}</div>
        )
    }
}
