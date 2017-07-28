import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import omit from 'lodash-es/omit';
import i from 'icepick';
import { optimistic, BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui';

const WIDGET_CREATE = 'WIDGET_CREATE';
const WIDGET_CREATE_SUCCESS = 'WIDGET_CREATE_SUCCESS';
const WIDGET_CREATE_FAILURE = 'WIDGET_CREATE_FAILURE';

const WIDGET_DELETE = 'WIDGET_DELETE';
const WIDGET_DELETE_SUCCESS = 'WIDGET_DELETE_SUCCESS';
const WIDGET_DELETE_FAILURE = 'WIDGET_DELETE_FAILURE';

let txnId = 0;

const widgetAction = (type, baseAction) => id => dispatch => {
    const nextTxnId = txnId++;

    const meta = (type = BEGIN) => ({ optimistic: { type, id: nextTxnId } });

    dispatch({
        type: baseAction,
        payload: {
            id,
            optimistic: true,
            type
        },
        meta: meta(),
    });


    setTimeout(() => {
        const didFail = Math.random() <= 0.2;
        dispatch({
            type: didFail ? baseAction + '_FAILURE' :  baseAction + '_SUCCESS',
            payload: {
                id,
                optimistic: false,
                type
            },
            meta: meta(didFail ? REVERT : COMMIT)
        });
    }, (Math.random() * 500) + 1000);
};

const createWidget = widgetAction('created', WIDGET_CREATE);
const deleteWidget = widgetAction('delete', WIDGET_DELETE);

const widgetReducer = (state = {}, action) => {
  switch (action.type) {
    case WIDGET_CREATE:
    case WIDGET_CREATE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case WIDGET_DELETE:
      return omit(state, action.payload.id);
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    widgets: optimistic(widgetReducer)
}), composeEnhancers(applyMiddleware(thunk)));

export {
    createWidget,
    deleteWidget,
    store,
}