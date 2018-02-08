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

module.exports = connect(mapStateToProps, mapDispatchToProps)(TimerControls);
