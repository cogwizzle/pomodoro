import Timer from './timer';
import { connect } from 'react-redux';

let timeoutAnchor;

const mapStateToProps = (state) => {

  return {
    isTicking: state.isTicking,
    time: state.time,
    isWorking: state.isWorking,
    cyclesComplete: state.cyclesComplete,
    workTime: state.workTime,
    restTime: state.restTime,
    extRestTime: state.extRestTime,
    restIncrement: state.restIncrement
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    tick: () => {
      dispatch({
        type: 'TICK_TIMER'
      });
    }
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  
});

let PomodoroTimer = connect(mapStateToProps, mapDispatchToProps)(Timer);
export default PomodoroTimer;
