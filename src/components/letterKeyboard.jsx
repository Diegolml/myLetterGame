import React, { Component } from 'react';

export default class LetterKeyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorClass: ""
        };
        this.letter = props.letter;
        this.className = props.className;
        this.onClick = props.onClick;
    }

    setColor = (color) => {
        this.setState({ colorClass: color })
    }

    render() {
        return (
            <div onClick={this.onClick} className={`${this.className} ${this.state.colorClass}`}>{this.letter}</div>
        )
    }
}
