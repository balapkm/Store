import initialState from '../config/state';
import types from './types';

/**
 * Store Reducers
 * @param state intial state
 * @param action any
 */
const storeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.LOAD_STORE:
            state = {
                ...state,
                loading: true
            }
            break;
        case types.ADD_STORE:
            state = {
                ...state,
                loading: true
            }
            break;
        case types.STORE_RECEIVED:
            state = {
                ...state,
                store: action.payload,
                loading: false
            }
            break;
        case types.LOAD_SINGLE_STORE:
            state = {
                ...state,
                loading: true
            }
            break;
        case types.SINGLE_STORE_RECEIVED:
            state = {
                ...state,
                loading: false,
                singleStore: action.payload,
            }
            break;
        case types.DELETE_STORE:
            state = {
                ...state,
                loading: true,
            }
            break;
        case types.SEARCH_STORE:
            state = {
                ...state,
                loading: true,
            }
            break;
        default:
            break;
    }

    return state;
}

export default storeReducer;