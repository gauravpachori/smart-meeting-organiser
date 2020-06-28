import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import data from './reducer';

const reducers = combineReducers({
    data
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;