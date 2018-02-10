import RoundHouse from '../sounds/Roundhouse Kick-SoundBible.com-1663225804.mp3';

/**
 * Persiste the application state.
 */
const saveState = (state) => {
  localStorage.setItem('pomodoro', JSON.stringify(state));
}

/**
 * Load the application state.
 */
const loadState = () => (
  JSON.parse(localStorage.getItem('pomodoro')) || 
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
    }
);

module.exports = { saveState, loadState };
