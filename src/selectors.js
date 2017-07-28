import {ensureState} from 'redux-optimistic-ui';
import {createSelector} from 'reselect';

const widgets = state => ensureState(state.widgets);
const getWidgets = createSelector([
    widgets
], (widgets) => Object.keys(widgets || []).map(id => widgets[id]));

export {
    getWidgets,
};
