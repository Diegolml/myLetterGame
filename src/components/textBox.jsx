import React, { Component } from 'react';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            validClass: ""
        }
        this.onClick = props.onClick;
    }

    setWord = (word) => {
        
        this.setState({ word: word });
    };

    setValidClass = (className) => {
        this.setState({ validClass: className });
    }

    render() {
        return (
            <div className="display">
                <div className={`display-word ${this.state.validClass}`}>
                    {this.state.word}
                </div>
                <div className={`display-result ${this.state.validClass}`}>
                    {this.state.validClass === "valid" ? "valid" : "invalid"}
                </div>
            </div>
        )
    }
}
