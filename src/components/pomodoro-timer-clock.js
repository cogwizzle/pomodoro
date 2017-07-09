import React from 'react';

export default class PomodoroTimerClock extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(){
    super();
  }

  /**
   * JSX based render function.
   */
  render(){
    return (
      <span className="pomodoro-timer-clock">
        <h1>Time</h1>
        <div>{Math.floor(this.props.time / 60)} : {this.props.time % 60}</div>
      </span>
    )
  }
}
