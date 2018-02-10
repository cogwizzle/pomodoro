import reducer from '../timer';
import { createStore } from 'redux';
import { tickClock, toggleClock, setTime } from '../../creators/timer_creators';

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
    cyclesComplete: 0,
    alert: undefined,
    expireTime: undefined,
    downTime: 0
  }

  expect(state).toEqual(expected);
});

it('Timer shall toggle the timer when passed the action TOGGLE_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch(toggleClock());

  const isTicking = store.getState().isTicking;
  const expireTime = store.getState().expireTime;
  const expectedTicking = true;
  expect(isTicking).toBe(expectedTicking);
  expect(expireTime).toBeGreaterThan((new Date()).getTime());
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
      alert: undefined,
      expireTime: undefined,
      downTime: 0
    }
  );

  store.dispatch(tickClock());
  
  const state = store.getState();
  const expected = {
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 300,
      isWorking: false,
      isTicking: false,
      cyclesComplete: 1,
      alert: undefined,
      expireTime: undefined,
      downTime: 0
  };
  expect(state).toEqual(expected);
});

it('Timer shall set the time value when passed the action SET_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch(setTime(2000));

  const time = store.getState().time;
  const expected = 2000;
  expect(time).toEqual(expected);
});
