import React, { Component } from 'react';

export default class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.children = props.children
    }

    render() {
        return (
            <div className="board-container">
                {this.children}
            </div>
        )
    }
}
