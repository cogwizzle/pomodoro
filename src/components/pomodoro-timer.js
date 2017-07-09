import React from 'react';
import PomodoroTimerClock from './pomodoro-timer-clock';
import PomodoroTimerControls from './pomodoro-timer-controls';

export default class PomodoroTimer extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(){
    super();

    this.state = {
      time : 1500,
    }
  }

  /**
   * JSX based render function.
   */
  render(){
    return(
      <div className="pomodoro-timer">
        <PomodoroTimerClock time={this.state.time} />
        <PomodoroTimerControls time={this.state.time} setTime={this._setTime.bind(this)} />
      </div>
    );
  }

  _setTime(newTime){
    this.setState({time : newTime});
  }
}
