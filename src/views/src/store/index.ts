import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index';
import rootSaga from '../sagas/index';
import createSagaMiddleware from 'redux-saga';

/**
 * init saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Create store and middleware
 */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            sagaMiddleware
        ),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    )
)
/**
 * run saga watchers
 */
sagaMiddleware.run(rootSaga);

export default store;