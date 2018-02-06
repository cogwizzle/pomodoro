import RoundHouse from '../../sounds/Roundhouse Kick-SoundBible.com-1663225804.mp3';

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
    alert: RoundHouse
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
     
      let nextState = {...state};

      if (nextState.time > 0 && nextState.isTicking) {

        nextState.time = --nextState.time;
      } else if (nextState.time === 0) {
  
        if (state.alert){
            new Audio(state.alert).play();
        }

        nextState.isTicking = false;
        
        if (nextState.isWorking) {

          nextState.cyclesComplete = ++nextState.cyclesComplete;
          
          if (nextState.cyclesComplete > 0 && nextState.cyclesComplete % nextState.restIncrement === 0) {

            nextState.time = nextState.extRestTime;
          } else {

            nextState.time = nextState.restTime;
          }
        } else {

          nextState.time = nextState.workTime;
        }

        nextState.isWorking = !nextState.isWorking;
      }

      return nextState;
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
