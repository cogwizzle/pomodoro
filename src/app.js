import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './components/pomodoro-timer';
import { Provider } from 'react-redux';
import createStore from './create_store';
import throttle from 'lodash/throttle';
import { saveState } from './local_storage';

const store = createStore();

store.subscribe(throttle(() => {

  saveState(store.getState());
}, 1000));

ReactDOM.render(
  (<Provider store={store}> 
    <PomodoroTimer />
  </Provider>),
  document.querySelector("#content-anchor")
);
