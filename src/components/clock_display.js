import React from 'react';

export default class ClockDisplay extends React.Component{
  
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
    const cardStyle = {
      "padding" : "35px",
      "margin" : "5px",
      "fontSize" : "x-large",
      "display" : "inline-block",
    }
    const rawMinute = Math.floor(this.props.time / 60);
    const rawSecond = this.props.time % 60;
    const minute = (((rawMinute + "").length < 2) ? '0' : '') + rawMinute;
    const second = (((rawSecond + "").length < 2) ? '0' : '') + rawSecond;

    return (
      <span className="clock_display">
        <div>
          <div style={cardStyle}>
            {minute} : {second}
          </div>
        </div>
      </span>
    )
  }
}
