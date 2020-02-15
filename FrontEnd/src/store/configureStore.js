import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import sneakersReducer from '../reducers/sneakers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default()=>{
    const store=createStore(
        // combines reducers.. 
        combineReducers({
            sneakers: sneakersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}