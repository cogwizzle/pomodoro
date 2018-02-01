/**
 * Timer reducer for keeping track of time application state.
 */
function Timer(
  state = {
    workTime: 1500,
    restTime: 300,
    extRestTime: 900,
    restIncrement: 4,
    time: 1500,
    isWorking: true,
    isTicking: false,
    cyclesComplete: 0 
  },
  action) {
  switch(action.type) {
    case 'TOGGLE_TIMER':
      let cycles = state.cyclesComplete + 1;

      return {...state, ...{
        isTicking: !state.isTicking,
        cyclesComplete: (action.cycle) ? cycles : state.cyclesComplete
      }};
    case 'TICK_TIMER':

      let nextTime = state.time - 1;

      return {...state, ...{time: nextTime}};
    case 'SET_TIMER':

      return {...state, ...{
        time: action.time,
        isWorking: (action.hasOwnProperty('working')) ? action.working : !state.isWorking
      }};
    case 'CYCLE_COMPLETE_TIMER':
      let completed = state.cyclesComplete + 1;
      
      return {...state, ...{cyclesComplete: completed}};
    case 'RESET_TIMER':

      return {...state, ...{
        time: 1500,
        isWorking: true,
        isTicking: false,
        cyclesComplete: 0
      }};
    default:

      return state;
  }
}

module.exports = Timer;
