import reducer from '../timer';
import { createStore } from 'redux';

it('Timer shall return the default state when passed no state and a non valid option.', () => {
  let store = createStore(reducer);

  store.dispatch({
    type: 'FAKE_ACTION'
  });

  const state = store.getState();
  const expected = {
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 0 
  }

  expect(state).toEqual(expected);
});

it('Timer shall toggle the timer when passed the action TOGGLE_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch({
    type: 'TOGGLE_TIMER'
  });

  const isTicking = store.getState().isTicking;
  const expected = true;
  expect(isTicking).toBe(true);
});

it('Timer shall decrement the amount of time by one when passed the action TICK_TIMER.', () => {
  let store = createStore(
    reducer,
    {
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 1500,
      isWorking: true,
      isTicking: true,
      cyclesComplete: 0,
      alert: undefined
    }
  );

  store.dispatch({
    type: 'TICK_TIMER'
  });
  
  const state = store.getState();
  console.log('state: ', state);
  const expected = {
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 1499,
      isWorking: true,
      isTicking: true,
      cyclesComplete: 0,
      alert: undefined
  };
  expect(state).toEqual(expected);
});

it('Timer shall set the time value when passed the action SET_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch({
    type: 'SET_TIMER',
    time: 2000
  });

  const time = store.getState().time;
  const expected = 2000;
  expect(time).toEqual(expected);
});

it('Timer shall increment the cycles complete when passed the CYCLE_COMPLETE_TIMER action.', () => {
  let store = createStore(reducer);

  store.dispatch({
    type: 'CYCLE_COMPLETE_TIMER'
  });

  const cycles = store.getState().cyclesComplete;
  const expected = 1;
  expect(cycles).toEqual(expected);
});

it('Timer shall reset tot he default values when RESET_TIMER action is passed.', () => {
  let store = createStore(reducer);

  store.dispatch({
    type: 'RESET_TIMER'
  });

  const state = store.getState();
  const expected = {
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 0 
  };
  expect(state).toEqual(expected);
});
