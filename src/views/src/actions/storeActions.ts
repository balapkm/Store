import types from '../reducers/types';

/**
 * Load Store
 * @param {*} data
 */
export function loadStore(payload: object) {
    return {
        type: types.LOAD_STORE,
        payload
    }
}
/**
 * Create Store
 * @param payload
 */
export function createStore(payload: object) {
    return {
        type: types.ADD_STORE,
        payload
    }
}

/**
 * Edit Store
 * @param payload
 */
export function loadSingleStore(payload: object) {
    return {
        type: types.LOAD_SINGLE_STORE,
        payload
    }
}

/**
 * Update Store
 * @param payload
 */
export function updateStore(payload: object) {
    return {
        type: types.UPDATE_STORE,
        payload
    }
}

/**
 * Delete Store
 * @param payload
 */
export function deleteStore(payload: object) {
    return {
        type: types.DELETE_STORE,
        payload
    }
}

/**
 * Search Store
 * @param payload
 */
export function searchStore(payload: object) {
    return {
        type: types.SEARCH_STORE,
        payload
    }
}