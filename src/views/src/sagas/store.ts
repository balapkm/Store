import { put, takeLatest, call } from 'redux-saga/effects';
import types from '../reducers/types';
import { callWS, showAlert } from '../services/common';

/**
 * Fetch store
 * @param action Object
 */
function* fetchStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store');
    yield put({ type: types.STORE_RECEIVED, payload: json.data });
}

/**
 * Add store
 * @param action object
 */
function* addStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store/create');
    showAlert(json.data.msg);
    yield put({ type: types.LOAD_STORE, payload: {} });
}

/**
 * Get single store
 * @param action object
 */
function* getSingleStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store');
    yield put({ type: types.SINGLE_STORE_RECEIVED, payload: json.data });
}

/**
 * Update store
 * @param action object
 */
function* updateStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store/update');
    showAlert(json.data.msg);
    yield put({ type: types.LOAD_STORE, payload: {} });
}

/**
 * Delete store
 * @param action object
 */
function* deleteStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store/delete');
    showAlert(json.data.msg);
    yield put({ type: types.LOAD_STORE, payload: {} });
}

/**
 * Search store
 * @param action object
 */
function* searchStore(action: object) {
    const json = yield call(callWS, (action as any).payload, 'store/search');
    yield put({ type: types.STORE_RECEIVED, payload: json.data });
}

/**
 * list of store watchers
 */
function* storeActionWatcher() {
    yield takeLatest(types.LOAD_STORE, fetchStore);
    yield takeLatest(types.ADD_STORE, addStore);
    yield takeLatest(types.LOAD_SINGLE_STORE, getSingleStore);
    yield takeLatest(types.UPDATE_STORE, updateStore);
    yield takeLatest(types.DELETE_STORE, deleteStore);
    yield takeLatest(types.SEARCH_STORE, searchStore);
}

export {
    storeActionWatcher
}