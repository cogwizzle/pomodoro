import TimerControls from './timer_controls';
import { connect } from 'react-redux';
import { toggleClock, setTime } from '../creators/timer_creators';

const mapStateToProps = state => ({
  isWorking: state.isWorking,
  isTicking: state.isTicking,
  workTime: state.workTime,
  restTime: state.restTime
});

const mapDispatchToProps = dispatch => ({
  toggleClock: () => {
    dispatch(toggleClock());
  },
  setTime: (time, isWorking) => {
    dispatch(setTime(time, isWorking));
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...{
    skip: () => {
   
      const { isWorking, isTicking, workTime, restTime } = stateProps;

      if (isTicking) {

        dispatchProps.toggleClock();
      }

      dispatchProps.setTime(((isWorking) ? restTime : workTime), isWorking);
    },
    toggle: () => {
    
      dispatchProps.toggleClock();
    }
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TimerControls);
