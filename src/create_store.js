import timer from './reducers/timer';
import { createStore } from 'redux';
import { loadState } from './local_storage';

const customCreateStore = () => {
  return createStore(
    timer,
    loadState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

module.exports = customCreateStore;
