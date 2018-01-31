import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroTimer from './components/pomodoro-timer';
import Timer from './reducers/timer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore(Timer, undefined, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.dispatch({
  type: 'SET_TIMER',
  time: 1500,
  working: true 
});

ReactDOM.render(
  (<Provider store={store}> 
    <PomodoroTimer />
  </Provider>),
  document.querySelector("#content-anchor")
);
