import React from 'react';
import PropTypes from 'prop-types';
import ClockDisplay from './clock_display';
import PomodoroTimerControls from './pomodoro-timer-controls';
import RoundHouse from '../../sounds/Roundhouse Kick-SoundBible.com-1663225804.mp3';

export default class PomodoroTimer extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(){
    super();
    this.timeExpireSound = new Audio(RoundHouse);
  }

  /**
   * After component mounts.
   */
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();

      let isTicking = store.getState().isTicking;
      if (isTicking) {
        this._tick(store);
      }
    });
  }

  _tick(store) {
    let { time, isWorking, isTicking, cyclesComplete, workTime, restTime, extRestTime, restIncrement } = store.getState();
    if (time > 0) {

      setTimeout(() => {
        if (store.getState().isTicking) {
          store.dispatch({
            type: 'TICK_TIMER'
          });
        }
      }, 1000);
    } else {

      let time = 0;

      this.timeExpireSound.play();
      store.dispatch({
        type: 'TOGGLE_TIMER',
      });

      if (store.getState().isWorking) {

        store.dispatch({
          type: 'CYCLE_COMPLETE_TIMER',
        });


        if (store.getState().cyclesComplete > 0 && store.getState().cyclesComplete % restIncrement == 0) {

          time = extRestTime;
        } else {

          time = restTime;
        }
      } else {

        time = workTime;
      }

      store.dispatch({
        type: 'SET_TIMER',
        time: time
      });
    }
  }

  /**
   * Before react is removed from DOM.
   */
  componentWillUnmount() {
    this.unsubscribe()
  }

  /**
   * JSX based render function.
   */
  render(){
    let wrapper = {
      "width" : "151px",
    }
    const { store } = this.context;

    return(
      <div className="pomodoro-timer" style={wrapper}>
        <ClockDisplay time={store.getState().time} />
        <PomodoroTimerControls />
      </div>
    );
  }
}
PomodoroTimer.contextTypes = {
  store: PropTypes.object
};
