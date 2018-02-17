import reducer from '../timer';
import { createStore } from 'redux';
import { tickClock, toggleClock, setTime, ringToggle } from '../../creators/timer_creators';

it('Timer shall return the default state when passed no state and a non valid option.', () => {
  let store = createStore(reducer);

  store.dispatch({ type: 'FAKE_ACTION' });

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
    downTime: 0,
    ring: false
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

it('Timer shall toggle and set the appropraite expireTime when one already exists when the timer when passed the action TOGGLE_TIMER', () => {

  const currentState = reducer({
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 0,
    alert: undefined,
    expireTime: 12345,
    downTime: 0,
    ring: false
  }, toggleClock());

  expect(currentState.expireTime).toBeGreaterThan((new Date()).getTime());
});

it('Timer shall toggle and set the appropraite expireTime when one already exists and time is ticking when the timer when passed the action TOGGLE_TIMER', () => {

  const currentState = reducer({
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: true,
    cyclesComplete: 0,
    alert: undefined,
    expireTime: 12345,
    downTime: 0,
    ring: false
  }, toggleClock());

  expect(currentState.expireTime).toBeLessThanOrEqual((new Date()).getTime());
});

it('Timer shall toggle the timer when passed the action TOGGLE_TIMER', () => {

  const startTime = (new Date()).getTime();

  const currentState = reducer({
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 0,
    alert: undefined,
    expireTime: 12345,
    downTime: 0,
    ring: false
  }, toggleClock());

  expect(currentState.expireTime).toBeGreaterThan((new Date()).getTime());
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
      downTime: 0,
      ring: true
  };

  expect(state).toEqual(expected);
});

it('Timer shall use extended rest time when the number of cyles completed will be the restIncrement and passed the action TICK_TIMER.', () => {
  let store = createStore(
    reducer,
    {
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 1500,
      isWorking: true,
      isTicking: true,
      cyclesComplete: 3,
      alert: undefined,
      expireTime: undefined,
      downTime: 0,
      ring: false
    }
  );

  store.dispatch(tickClock());
  
  const state = store.getState();
  const expected = {
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 900,
    isWorking: false,
    isTicking: false,
    cyclesComplete: 4,
    alert: undefined,
    expireTime: undefined,
    downTime: 0,
    ring: true
  };

  expect(state).toEqual(expected);
});

it('Timer shall use work time when the time expires, and isWorking is false while dispatching the action TICK_TIMER.', () => {
  let store = createStore(
    reducer,
    {
      workTime: 1500,
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 1500,
      isWorking: false,
      isTicking: true,
      cyclesComplete: 3,
      alert: undefined,
      expireTime: undefined,
      downTime: 0,
      ring: false
    }
  );

  store.dispatch(tickClock());
  
  const state = store.getState();
  const expected = {
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 3,
    alert: undefined,
    expireTime: undefined,
    downTime: 0,
    ring: true
  };

  expect(state).toEqual(expected);
});

it('Timer shall calculate the current time based on the expire time when passed action TICK_TIMER.', () => {

  const future = 9999999999999;

  const state = reducer({
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: true,
    cyclesComplete: 0,
    alert: undefined,
    expireTime: future,
    downTime: 0,
    ring: false
  }, 
    tickClock());

  expect(state.time).toBeLessThan(future);
});

it('Timer shall toggle ring and isTicking when the time has expired and the action TICK_TIMER is dispatched.', () => {

  const past = 0;

  const state = reducer({
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: true,
    cyclesComplete: 0,
    alert: undefined,
    expireTime: past,
    downTime: 0,
    ring: false
  }, 
    tickClock());

  expect(state.ring).toEqual(true);
  expect(state.isTicking).toEqual(false);
});

it('Timer shall set the time value when passed the action SET_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch(setTime(2000));

  const time = store.getState().time;
  const expected = 2000;
  expect(time).toEqual(expected);
});

it('Timer shall set the time value when passed the action SET_TIMER', () => {
  let store = createStore(reducer);

  store.dispatch(setTime(2000, true));

  const time = store.getState().time;
  const isWorking = store.getState().isWorking;
  const expected = 2000;
  expect(time).toEqual(expected);
  expect(isWorking).toEqual(true);
});

it('Timer shall swap the value of the ring prop when passed the property TOGGLE_RING.', () => {

  const currentState = reducer(undefined, ringToggle());

  expect(currentState).toEqual({
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
      downTime: 0,
      ring: true
  });
});
