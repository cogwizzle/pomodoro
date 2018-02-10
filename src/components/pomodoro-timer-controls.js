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
  toggle: () => {
    dispatch(toggleClock());
  },
  setTime: (time, isWorking) => {
    dispatch(setTime(time, isWorking));
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  skip: () => {
 
    const { isWorking, isTicking, workTime, restTime } = stateProps;

    if (isTicking) {

      dispatchProps.toggleClock();
    }

    dispatchProps.setTime(((isWorking) ? restTime : workTime), isWorking);
  },
  toggle: dispatchProps.toggle,
  isTicking: stateProps.isTicking
});

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TimerControls);
