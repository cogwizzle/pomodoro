import React from 'react';
import PropTypes from 'prop-types';
import ClockDisplay from './clock_display';
import PomodoroTimerControls from './pomodoro-timer-controls';

export default class Timer extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(props){
    super(props);
  }

  /**
   * After component mounts.
   */
  componentDidMount() {
    if (!this.timeout){
      this.timeout = setInterval(() => {
        this.props.tick();
      }, 1000);
    }
  }

  /**
   * Before react is removed from DOM.
   */
  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(timeout);
    }
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
        <ClockDisplay time={this.props.time} />
        <PomodoroTimerControls />
      </div>
    );
  }
}
