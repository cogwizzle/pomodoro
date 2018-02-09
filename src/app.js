import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './components/pomodoro-timer';
import { Provider } from 'react-redux';
import createStore from './create_store';
import throttle from 'lodash/throttle';

const store = createStore();

store.subscribe(throttle(() => {

  localStorage.setItem('pomodoro', JSON.stringify(store.getState()));
}, 1000));

ReactDOM.render(
  (<Provider store={store}> 
    <PomodoroTimer />
  </Provider>),
  document.querySelector("#content-anchor")
);
