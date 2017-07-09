import React from 'react';

export default class PomodoroTimerControls extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(){
    super();

    this.state = {
      faClass : "fa fa-play",
    }

    this._interval = false;
  }

  /**
   * JSX based render function.
   */
  render(){
    var wrapper = {
      "width" : "151px",
    }

    var buttonStyle = {
      "boxShadow": "5px 0px 5px #888888",
      "width" : "50%",
      "border":"2px solid",
    }

    var skipButtonStyle = {

    }

    return (
      <div style={wrapper}>
        <button style={buttonStyle} onClick={this._toggleCountDown.bind(this)}><i className={this.state.faClass} /></button>
        <button style={buttonStyle} onClick={this._skip.bind(this)}><i className="fa fa-fast-forward" /></button>
      </div>
    );
  }

  /**
   * Toggle on and off count down.
   */
  _toggleCountDown(){
    var audio = new Audio("./assets/Roundhouse Kick-SoundBible.com-1663225804.mp3");
    if(!this._interval){
      this._interval = setInterval(() => {
        if(this.props.time > 0){
          this.props.setTime(this.props.time - 1);
        }else{
          audio.play();
          this._skip();
        }
      }, 1000);
      this.setState({
        faClass : "fa fa-pause"
      });
    }else{
      clearInterval(this._interval);
      this._interval = false;
      this.setState({
        faClass : "fa fa-play"
      });
    }
  }

  _skip(){
    if(this.props.iteration > 0 && this.props.iteration % 8 == 0){
      this.props.setTime(900);
      if(this._interval){
        this._toggleCountDown();
      }
    }else if(this.props.iteration == 0 || (this.props.iteration % 2 == 0)){
      this.props.setTime(300);
      if(this._interval){
        this._toggleCountDown();
      }
    }else{
      this.props.setTime(1500);
      if(this._interval){
        this._toggleCountDown();
      }
    }
    this.props.incrementIteration();
  }

  /**
   * Before component unmounts.
   */
  componentWillUnmount(){
    if(this._interval){
      clearInterval(this._interval);
    }
  }
}
