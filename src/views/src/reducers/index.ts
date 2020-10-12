import { combineReducers } from 'redux';
import storeReducer from './store';

/**
 * combine all reducers
 */
const rootReducer: any = combineReducers({
    storeReducer
})

export default rootReducer;