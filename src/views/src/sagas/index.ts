import { storeActionWatcher } from './store';
import { all } from 'redux-saga/effects';
/**
 * include all saga watcher
 */
export default function* rootSaga() {
    yield all([
        storeActionWatcher(),
    ]);
}