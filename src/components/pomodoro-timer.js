import Timer from './timer';
import { connect } from 'react-redux';
import { tickClock } from '../creators/timer_creators';

let timeoutAnchor;

const mapStateToProps = (state) => ({
    isTicking: state.isTicking,
    time: state.time,
    isWorking: state.isWorking,
    cyclesComplete: state.cyclesComplete,
    workTime: state.workTime,
    restTime: state.restTime,
    extRestTime: state.extRestTime,
    restIncrement: state.restIncrement
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchTick: () => {
    dispatch(tickClock());
  }
});


const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...{tick: () => {

    if (stateProps.isTicking)
      dispatchProps.dispatchTick();
  }}
});

let PomodoroTimer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Timer);
export default PomodoroTimer;
