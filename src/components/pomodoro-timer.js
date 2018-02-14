import Timer from './timer';
import { connect } from 'react-redux';
import { tickClock } from '../creators/timer_creators';

const mapStateToProps = (state) => ({
  isTicking: state.isTicking,
  time: state.time,
  isWorking: state.isWorking,
  cyclesComplete: state.cyclesComplete,
  workTime: state.workTime,
  restTime: state.restTime,
  extRestTime: state.extRestTime,
  restIncrement: state.restIncrement,
  alert: state.alert,
  ring: state.ring
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchTick: () => {
    dispatch(tickClock());
  },
  toggleRing: () => {
    dispatch({type: 'TOGGLE_RING'});
  }
});


const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  tick: () => {

    if (stateProps.isTicking)
      dispatchProps.dispatchTick();
  },
  time: stateProps.time,
  isTicking: stateProps.isTicking,
  alert: stateProps.alert,
  ring: stateProps.ring,
  toggleRing: dispatchProps.toggleRing
}
);

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Timer);
