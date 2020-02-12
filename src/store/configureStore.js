import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default()=>{
    const store=createStore(
        // combines reducers.. 
        combineReducers({
            
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}