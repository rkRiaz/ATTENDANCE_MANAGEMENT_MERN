import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './localStorage'


const middleware = [thunk]
const persistedState = loadState();


const store = createStore(rootReducer, persistedState, compose(
  applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

store.subscribe(() => {
  saveState({
    teacher: store.getState().teacher,
  });
});

export default store;