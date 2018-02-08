import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class TimerControls extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(props){
    super(props);
  }

  /**
   * JSX based render function.
   */
  render(){
    let wrapper = {
      "width" : "151px",
    }

    let buttonStyle = {
      "boxShadow": "5px 0px 5px #888888",
      "width" : "50%",
      "border":"2px solid",
    }

    return (
      <div style={wrapper}>
        <button style={buttonStyle} onClick={this._toggleCountDown.bind(this)}><i className={(this.props.isTicking) ? 'fa fa-pause' : 'fa fa-play'} /></button>
        <button style={buttonStyle} onClick={this._skip.bind(this)}><i className="fa fa-fast-forward" /></button>
      </div>
    );
  }

  /**
   * Toggle on and off count down.
   */
  _toggleCountDown(){

    this.props.toggle();
  }

  _skip() {
    const { isWorking, isTicking, workTime, restTime } = this.props;

    if (isTicking) {

      this.props.toggle();
    }

    this.props.setTime(((isWorking) ? restTime : workTime), isWorking);
  }
}
