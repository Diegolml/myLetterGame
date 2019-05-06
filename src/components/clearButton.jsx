import React, { Component } from 'react';

export default class ClearButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
        }
        this.onClick = props.onClick
    }

    setVisible = (bool) => {
        this.setState({ visible: bool });
    }

    render() {
        return (
            <div className={`clear-container ${this.state.visible ? "" : "invisible"}`}>
                <p onClick={this.onClick} className="clear-text">clear word</p>
                <div onClick={this.onClick} className="clear-button">X</div>
            </div>
        )
    }
}
