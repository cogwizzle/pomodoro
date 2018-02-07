import timer from './reducers/timer';
import RoundHouse from '../sounds/Roundhouse Kick-SoundBible.com-1663225804.mp3';
import { createStore } from 'redux';

const customCreateStore = () => {
  return createStore(
    timer,
    {
      workTime: 1500,
      restTime: 300,
      extRestTime: 900,
      restIncrement: 4,
      time: 1500,
      isWorking: true,
      isTicking: false,
      cyclesComplete: 0,
      alert: RoundHouse 
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

module.exports = customCreateStore;
