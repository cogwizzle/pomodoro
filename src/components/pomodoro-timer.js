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
      iteration : 2,
    }
  }

  /**
   * JSX based render function.
   */
  render(){
    var wrapper = {
      "width" : "151px",
    }

    return(
      <div className="pomodoro-timer" style={wrapper}>
        <PomodoroTimerClock time={this.state.time} clockColor={this.props.clockColor}/>
        <PomodoroTimerControls time={this.state.time} setTime={this._setTime.bind(this)} iteration={this.state.iteration} incrementIteration={this._incrementIteration.bind(this)} />
      </div>
    );
  }

  _setTime(newTime){
    this.setState({time : newTime});
  }

  _incrementIteration(){
    this.setState({iteration : this.state.iteration + 1});
  }
}
