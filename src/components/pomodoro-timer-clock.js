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
    var cardStyle = {
      "border":"2px solid",
      "boxShadow": "5px 0px 5px #888888",
      "padding" : "40px",
      "fontSize" : "x-large",
      "display" : "inline-block",
      "backgroundColor" : "white",
    }

    return (
      <span className="pomodoro-timer-clock">
        <div>
          <div style={cardStyle}>
            {this._timeDisplay(Math.floor(this.props.time / 60))} : {this._timeDisplay(this.props.time % 60)}
          </div>
        </div>
      </span>
    )
  }

  _timeDisplay(time){
    if((time + "").length < 2){
      return "0" + time;
    }else{
      return time;
    }
  }
}
