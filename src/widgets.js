import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getWidgets } from './selectors';

class Widget extends Component {
  render() {
    const { optimistic, type } = this.props;
    return (
      <div className={classNames('widget', {
        optimistic,
        deleted: type === 'deleted',
        created: type === 'created',
      })}>
        <div className="label">{this.props.label}</div>
      </div>
    );
  }
}

class Widgets extends Component {
    render() {
        return (
        <div className="widget-container">
            {this.props.widgets.map(widget => (
                <Widget
                    key={widget.id}
                    label={widget.id}
                    optimistic={widget.optimistic}
                    type={widget.type}
                />
            ))}
        </div>
        );
    }
}

export default connect(state => ({
    widgets: getWidgets(state),
}))(Widgets);