const tickClock = () => ({
  type: 'TICK_TIMER'
});

const toggleClock = () => ({
  type: 'TOGGLE_TIMER'
});

const setTime = (time, working) => ({
  type: 'SET_TIMER',
  time: time,
  isWorking: working
});

module.exports = {
  tickClock,
  toggleClock,
  setTime
};
