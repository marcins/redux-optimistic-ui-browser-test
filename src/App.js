
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { createWidget, deleteWidget } from './state';

import Widgets from './widgets';
import { getWidgets } from "./selectors";

class App extends Component {
  idx = 1;

  onAddClick = (num = 1) => {
    for (let i = 0; i < num; i++) {
      setTimeout(() => this.props.createWidget(this.idx++), Math.random() * 500);
    }
  };

  onDeleteClick = (num = 1) => {
      for (let i = 0; i < num; i++) {
          setTimeout(() => {
              if (this.props.widgets.length === 0) {
                  return;
              }
              const idToDelete = this.props.widgets[Math.floor(Math.random() * this.props.widgets.length)].id;
              this.props.deleteWidget(idToDelete)
          }, Math.random() * 500);
      }
  }

  render() {
    return (
      <div className="App">
        <h1>redux-optimistic-ui browser test</h1>

        <Widgets />
        <div className="buttons">
            <button onClick={this.onAddClick}>Add</button>
            <button onClick={() => this.onAddClick(100)}>Add 100</button>
        </div>
          <div className="buttons">
              <button onClick={this.onDeleteClick}>Del</button>
              <button onClick={() => this.onDeleteClick(100)}>Del 100</button>
          </div>
      </div>
    );
  }
}

export default connect(state => ({
    widgets: getWidgets(state),
}), {
    createWidget,
    deleteWidget,
})(App);
