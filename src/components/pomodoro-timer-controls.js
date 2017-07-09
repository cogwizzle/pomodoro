import React from 'react';

export default class PomodoroTimerControls extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(){
    super();

    this.state = {
      buttonText : "|>",
    }

    this._interval = false;
  }

  /**
   * JSX based render function.
   */
  render(){
    return (
      <button onClick={this._toggleCountDown.bind(this)}>{this.state.buttonText}</button>
    );
  }

  /**
   * Toggle on and off count down.
   */
  _toggleCountDown(){
    if(!this._interval){
      this._interval = setInterval(() => {
        if(this.props.time > 0){
          this.props.setTime(this.props.time - 1);
        }else{
          this.props.setTime(1500);
          this._toggleCountDown();
        }
      }, 1000);
      this.setState({
        buttonText : "||"
      });
    }else{
      clearInterval(this._interval);
      this._interval = false;
      this.setState({
        buttonText : "|>"
      });
    }
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
