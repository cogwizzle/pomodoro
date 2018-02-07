import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './components/pomodoro-timer';
import { Provider } from 'react-redux';
import createStore from './create_store';

let store = createStore();

ReactDOM.render(
  (<Provider store={store}> 
    <PomodoroTimer />
  </Provider>),
  document.querySelector("#content-anchor")
);
