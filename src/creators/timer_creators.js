const tickClock = () => ({
  type: 'TICK_TIMER'
});

const toggleClock = () => ({
  type: 'TOGGLE_TIMER'
});

const setTime = (time, working) => ({
  type: 'SET_TIMER',
  time: time,
  working: working
});

const ringToggle = () => ({
  type: 'TOGGLE_RING'
});

module.exports = {
  tickClock,
  toggleClock,
  setTime,
  ringToggle
};
