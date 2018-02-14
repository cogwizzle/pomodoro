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
    cyclesComplete: 0,
    alert: undefined,
    expireTime: undefined,
    downTime: 0,
    ring: false
  },
  action) {
  switch(action.type) {
    case 'TOGGLE_TIMER':
      let expireTime = undefined;
      let downTime = state.downTime || 0;

      // If the clock is currently not ticking.
      if (!state.isTicking) {

        // If a previous expire time exists.
        if (state.expireTime) {
          
          downTime = convertMilliToSec((new Date()).getTime() - state.expireTime) + state.downTime;
        }

        // Set the new expireTime to the future.
        expireTime = (new Date()).getTime() + convertSecToMilli(state.time);
      } else {

        // Reset the expire time to the current time.
        expireTime = (new Date()).getTime();
      }

      return {...state, ...{
        isTicking: !state.isTicking,
        expireTime: expireTime,
        downTime: downTime
      }};
    case 'TICK_TIMER':

      let nextState = {...state};

      // Is the expire time in the future and the timer ticking.
      if ((nextState.expireTime - (new Date()).getTime()) > 0 && nextState.isTicking) {
       
        nextState.time = convertMilliToSec(nextState.expireTime - (new Date()).getTime());

      // If the timer is ticking.
      } else if (nextState.isTicking) {

        // If alert is set play audio.
        nextState.ring = true;

        // Stop timer from ticking.
        nextState.isTicking = false;
        
        // If the timer is on a work cycle.
        if (nextState.isWorking) {

          // Increment the number of cycles complete.
          nextState.cyclesComplete = ++nextState.cyclesComplete;
          
          // If 4 periods of work have been completed.
          if (nextState.cyclesComplete > 0 && nextState.cyclesComplete % nextState.restIncrement === 0) {

            // Extended rest time.
            nextState.time = nextState.extRestTime;
          } else {

            // Normal rest time.
            nextState.time = nextState.restTime;
          }
        } else {

          // Set work time to the work period increment.
          nextState.time = nextState.workTime;
        }

        // Switch the is working flag.
        nextState.isWorking = !nextState.isWorking;
      }

      return nextState;
    case 'SET_TIMER':

      return {...state, ...{
        time: action.time,
        isWorking: (action.hasOwnProperty('working')) ? action.working : !state.isWorking
      }};
    case 'TOGGLE_RING':

      return {...state, ...{ring: !state.ring}};
    default:

      return state;
  }
}

function convertSecToMilli(milli) {
  return milli * 1000;
}

function convertMilliToSec(epoch) {
  return epoch / 1000;
}

module.exports = Timer;
